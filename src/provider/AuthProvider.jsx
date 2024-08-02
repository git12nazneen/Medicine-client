// import {  createContext, useEffect, useState } from "react";
// import {  GoogleAuthProvider,  createUserWithEmailAndPassword,  getAuth,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { app } from "../../firebase.config";
// import UseAxiosPublic from "../hooks/UseAxiosPublice";


// export const AuthContext = createContext(null);
// const auth = getAuth(app)

// const AuthProvider = ({children}) => {
//     const axiosPublic = UseAxiosPublic()
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const googleProvider = new GoogleAuthProvider();


//     // create user
//     const createUser = (email, password)=>{
//         setLoading (true)
//         return createUserWithEmailAndPassword(auth, email, password)
//     }

//     // sign in user

//     const signIn = (email, password) =>{
//         setLoading(true)
//         return signInWithEmailAndPassword(auth, email, password)
//     }


//     // google login
//     const googleLogin = () =>{
//         setLoading(true)
//         return signInWithPopup(auth, googleProvider)
//     }

//     // update user
//   // update user
// const updateUserProfile = (name, image) => {
//     return updateProfile(auth.currentUser, { // corrected from auth.createUser to auth.currentUser
//         displayName: name,
//         photoURL: image
//     }).then(() => {
//         // Manually set the user with updated information
//         setUser({ ...auth.currentUser, displayName: name, photoURL: image });
//         // Profile updated!
//         // ...
//     }).catch((error) => {
//         // An error occurred
//         // ...
//         console.error("Error updating profile: ", error);
//     });
// }

//     const logOut = () =>{
//         return signOut(auth)
//         // swal('logout successfully')
//      }


//     // observer

//     useEffect(()=>{
//         const unsubscribe = onAuthStateChanged (auth,createUser=>{
//            setUser(createUser)
//            if(createUser){
//                // get token and store
//                const userInfo = {email: createUser.email};
//                console.log('user infor', userInfo)
//                axiosPublic.post('/jwt',userInfo)
//                .then(res=>{
//                    if(res.data.token){
//                        localStorage.setItem('access-token', res.data.token);
//                        setLoading(false)
//                    }
//                })
//            }
//            else{
//                // remove token .
//                localStorage.removeItem('access-token')
//                setLoading(false)
//            }
//            console.log('current user', createUser);
//          })
//          return () =>{
//            return unsubscribe()
//          }
//        },[axiosPublic])


//     const authInfo = {
//         googleLogin,
//         signIn,
//         createUser,
//         user,
//         loading,
//         logOut,
//         updateUserProfile
//     }


//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;



import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase.config";
import UseAxiosPublic from "../hooks/UseAxiosPublice";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = UseAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    }).then(() => {
      setUser({ ...auth.currentUser, displayName: name, photoURL: image });
    }).catch((error) => {
      console.error("Error updating profile: ", error);
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    googleLogin,
    signIn,
    createUser,
    user,
    loading,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
