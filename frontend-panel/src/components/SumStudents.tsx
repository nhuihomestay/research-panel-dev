import { useState, useEffect } from "react";
import axios from "axios";

export const SumStudents = () => {
  const [sumBatch, setSumBatch] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [active, setActive] = useState(false);
  const [activeS, setActiveS] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app-research-panel.onrender.com/api/student/count",
          {
            params: {
              id: "batch",
            },
          }
        );
        setSumBatch(response.data.data);
        console.log(response.data.data);
        setActive(true);
      } catch (error) {
        console.error("Error fetching advisor data:", error);
      }
    };

    if (!active) {
      fetchData();
    }
  }, [active]);

  useEffect(() => {
    const fetchDataSd = async () => {
      try {
        const response = await axios.get(
          "https://app-research-panel.onrender.com/api/student"
        );
        setDataStudent(response.data.data);
        setActiveS(true);
        // console.log(`Student : ${data}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!activeS) {
      fetchDataSd();
    }
  }, [activeS]);

  const total = sumBatch.reduce((acc, item: any) => acc + item.count, 0);
  console.log(total);
  return (
    <div className="bg-black min-h-screen pt-[80px]">
      <table className="mx-auto my-5">
        <thead className="bg-[#5180e6]">
          <tr>
            <th className="w-[200px]" colSpan={2}>
              จำนวนนักศึกษาทั้งหมด
            </th>
            {/* <th className="w-[50px]">รวม</th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y text-center">
          {sumBatch.map((item: any) => (
            <tr>
              <td> รุ่นที่ {item._id}</td>
              <td className="w-[50px] ">{item.count}</td>
            </tr>
          ))}
          <tr className="bg-[#5baccc]">
            <td className="font-bold">Total</td>
            <td className="font-bold">{total}</td>
          </tr>
        </tbody>
      </table>

      <div className="">
        <table className="mx-auto divide-y-2 divide-gray-500">
          <thead className="bg-[#C9DDFF]">
            <tr>
              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                No.
              </th>
              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                Batch
              </th>
              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500 ">
                ID
              </th>
              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                Name
              </th>
              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                Type
              </th>

              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                Advisor
              </th>
              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                Co-Advisor
              </th>

              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                Grade
              </th>
              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                Remark
              </th>
              <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                Graduated
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {dataStudent.map((data: any, key: any) => (
              <tr>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {key + 1}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  รุ่นที่ {data.batch}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {data.student_id}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {data.student_name}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {data.type}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {data.advisor_name}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {data.co_advisor_name}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {data.grade}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {data.remark}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {data.is_graduated.toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
