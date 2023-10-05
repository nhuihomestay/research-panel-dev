import { useContext } from "react";
import { DataContext } from "../Context";
import axios from "axios";


export const SumStudents = () => {
  const { data }: any = useContext(DataContext); // form mockdata
  

  const batch = [];
  for (const item of data) {
    batch.push(item.batch);
  }
  const uniqueBatch = [...new Set(batch)];
  const batchCounts = {};
  console.log(uniqueBatch)

  async function getBatch() {
    axios.get('localhost:3000/api/student',)
    
  }


  return (
    <div className="pt-40 ">
      <table className="divide-y-2 ml-10 border-black">
        <thead>
          <tr>
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
          {Object.entries(batchCounts).map(([batch, count]) => (
            <h3 key={batch}>{`${batch}: ${count}`}</h3>
          ))}

          <h2 className="font-bold">รวมมีจำนวนทั้งหมด = {}</h2>
        </div>
      </div>
    </div>
  );
};
