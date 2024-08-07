// import React, { useContext, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Banner from "../../components/Banner";
// import { AppContext } from "../../hooks/AppContext";

// const Home = () => {
//   const { sideCollaps } = useContext(AppContext);

//   return (
//     <div className="flex">
//       <Sidebar sideCollaps={sideCollaps}></Sidebar>
//       <Banner></Banner>
//     </div>
//   );
// };

// export default Home;
import React, { useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import Banner from '../../components/Banner';
import { AppContext } from '../../hooks/AppContext';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
    const { sideCollaps } = useContext(AppContext);
    const [searchQuery] = useOutletContext();

    return (
        <div className='flex'>
            <Sidebar sideCollaps={sideCollaps} />
            <Banner searchQuery={searchQuery} />
        </div>
    );
};

export default Home;
