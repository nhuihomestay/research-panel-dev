import { createContext } from "react";
import data from "../mongodb.wan.json";

interface DataContextProps {
  data: any; // Replace 'any' with the actual type of your data
}

export const DataContext = createContext<DataContextProps | undefined>(
  undefined
);
export const Context = ({ children }: any) => {
  return (
    <DataContext.Provider value={{ data: data }}>
      {children}
    </DataContext.Provider>
  );
};

//   const [reload, setReload] = useState(!true);
//   const [data, setData] = useState(mockEmployees);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://jsd5-mock-backend.onrender.com/members"
//         );
//         setData((prevdata) => {
//           return [...response.data, ...prevdata];
//         });
//         setReload(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [reload]);
