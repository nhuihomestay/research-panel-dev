import { useContext } from "react";
import { DataContext } from "../Context";

export const SumStudents = () => {

  const { data }: any = useContext(DataContext); // form mockdata 
  


  //for count batch
  const batch7Count = data.filter(
    (item: any) => item.batch === "รุ่นที่ 7"
  ).length;
  const batch8Count = data.filter(
    (item: any) => item.batch === "รุ่นที่ 8"
  ).length;
  const batch9Count = data.filter(
    (item: any) => item.batch === "รุ่นที่ 9"
  ).length;
  const batch10Count = data.filter(
    (item: any) => item.batch === "รุ่นที่ 10"
  ).length;
  const sumAll = batch7Count + batch8Count + batch9Count + batch10Count;




  return (
    <div className="pt-40 ">
      <table className="divide-y-2 ml-10 border-black">
        <thead >
          <tr >
            <th className="">StudentId</th>
            <th className="px-5">Batch</th>
            <th>Name-Surname</th>
            <th>TH/IS</th>
            <th className="px-5">Advisor</th>
            <th className="px-5">Co-Advisor</th>
            <th>Look Really?</th>
            <th>Remark</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item._id.$oid}>
              <td>{item.student_id.$numberLong}</td>
              <td className="px-5">{item.batch}</td>
              <td>{item.student_name}</td>
              <td>{item.type}</td>
              <td>{item.advisor_name}</td>
              <td>{item.co_advisor_name}</td>
              <td>{item.semester}</td>
              <td>{item.Remark}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-10 mt-10 mb-10">
            <h2 className="font-bold">Total Student </h2>
        <div className="">
            <h3>รุ่นที่ 7 มีจำนวนทั้งหมด = {batch7Count}</h3>
            <h3>รุ่นที่ 8 มีจำนวนทั้งหมด = {batch8Count}</h3>
            <h3>รุ่นที่ 9 มีจำนวนทั้งหมด = {batch9Count}</h3>
            <h3>รุ่นที่ 10 มีจำนวนทั้งหมด = {batch10Count}</h3>
            <h2 className="font-bold">รวมมีจำนวนทั้งหมด = {sumAll}</h2>
        </div>
      </div>
    </div>
  );
};
