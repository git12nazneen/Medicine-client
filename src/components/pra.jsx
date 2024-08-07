    // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("fakedata.json")
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);



  const { data: cards = [], isLoading, error } = useQuery({
    queryKey: ["cards", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cards/${user.email}`);
      console.log(res.data); // Log the response to check if data is received correctly
      return res.data;
    },
  });


//  const { data: payments = [] } = useQuery({
//     queryKey: ["payments", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(/payments/${user.email});
//       return res.data;
//     },
//   });
//  const {
//     isLoading,
//     error,
//     data: cards,
//   } = useQuery({
//     queryKey: ["cards"],
//     queryFn: async () => {
//       const res = await fetch("http://localhost:5000/cards");
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     },
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading products</div>;
//   }



