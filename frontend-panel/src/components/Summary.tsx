import { useState, useEffect } from "react";
import axios from "axios";
// import moment from "moment";

// import { DataContext } from "../Context";

export const Summary = () => {
  const currentYear = (new Date).getFullYear() + 543;
  const currentDate: String = (new Date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  const currentTime: String = (new Date).toLocaleTimeString('th-TH')

  // const [advisors, setAdvisors] = useState<string>();
  // const { data }: any = useContext(DataContext);
  const [advisorData, setAdvisorData] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [active, setActive] = useState(false);
  const [activeS, setActiveS] = useState(false);
  const [advisor, setAdvisor] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app-research-panel.onrender.com/api/advisor"
        );
        setAdvisorData(response.data.data);
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
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (!activeS) {
      fetchDataSd();
    }
  }, [activeS]);

  // console.log(advisorData);
  // console.log(dataStudent);

  const foundItems = dataStudent.filter(
    (item: any) => item.advisor_name && item.advisor_name.includes(advisor)
  );
  const foundItemsCo = dataStudent.filter(
    (item: any) =>
      item.co_advisor_name && item.co_advisor_name.includes(advisor)
  );

  console.log(foundItems);
  console.log(foundItemsCo);

  const result: any[] = [];
  foundItems.map((item: any) => {
    result.push(item.type);
    return item.type;
  });
  console.log(`type ${result}`);

  const joinedString = result.join(",");
  const parts = joinedString.split(",");
  const counts: Record<string, number> = {};

  for (const part of parts) {
    const key = part.trim();
    counts[key] = (counts[key] || 0) + 1;
  }
  const th = counts["TH"];
  const ls = counts["LS"];
  console.log(`TH : ${th} and LS : ${ls}`);

  return (
    <>
      <div className="bg-gray-500 min-h-screen pt-[80px]">
        <h1 className="text-center mx-auto text-3xl py-5 text-white">
          ภาระงานอาจารย์ที่ปรึกษาวิทยานิพนธ์และการค้นคว้าอิสระ ปีการศึกษา
          {currentYear}
        </h1>
        <div className="text-white mx-auto flex justify-center">
          <select
            value={advisor}
            name="advisor"
            onChange={(e: any) => setAdvisor(e.target.value)}
            className="w-[100px] px-2 placeholder:text-sm text-sm text-black rounded-lg"
          >
            <option className="text-[#8085bb]" value="">
              Select
            </option>

            {advisorData.map((data: any, key) => (
              <option
                className="text-[#131c85]"
                value={data.advisor_name}
                key={key}
              >
                {data.advisor_name}
              </option>
            ))}
          </select>
          <h1 className="text-2xl mx-10">{advisor}</h1>
        </div>
        <p className="text-white mx-auto text-center text-xl my-3">
          ข้อมูลวันที่ {currentDate} {currentTime}
        </p>
        <div className="">
          <table className="w-full lg:w-[1200px] mx-auto divide-y-2 divide-gray-500">
            <thead className="bg-[#C9DDFF]">
              <tr>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500 whitespace-nowrap">
                  No.
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500 whitespace-nowrap">
                  ID
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500 whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500 whitespace-nowrap">
                  Type
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500 whitespace-nowrap">
                  Advisor
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500 whitespace-nowrap">
                  Co-Advisor
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500 whitespace-nowrap">
                  Remark
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {foundItems.length === 0 ? (
                <div>No data</div>
              ) : (
                foundItems.map((item: any, index: any) => (
                  <tr className="">
                    <td className="">{index + 1}</td>
                    <td>{item.student_id}</td>
                    <td>{item.student_name}</td>
                    <td>{item.type}</td>
                    <td>{item.advisor_name}</td>
                    <td>{item.co_advisor_name}</td>
                    <td>{item.remark}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <table className="mx-auto my-5">
          <thead className="bg-[#5180e6]">
            <tr>
              <th className="w-[150px]">ประเภท</th>
              <th className="w-[50px]">รวม</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center">
            <tr>
              <td>วิทยานิพนธ์</td>
              <td>{th}</td>
            </tr>
            <tr className="">
              <td>การค้นคว้าอิสระ</td>
              <td>{ls}</td>
            </tr>
          </tbody>
        </table>

        <div className="">
          <table className="w-full lg:w-[1200px] mx-auto divide-y-2 divide-gray-500">
            <thead className="bg-[#C9DDFF]">
              <tr>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  No.
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
                <th className="w-[150px] px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Advisor
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Co-Advisor
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Remark
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {foundItemsCo.length === 0 ? (
                <div>No data</div>
              ) : (
                foundItemsCo.map((item: any, index: any) => (
                  <tr className="">
                    <td className="">{index + 1}</td>
                    <td>{item.student_id}</td>
                    <td>{item.student_name}</td>
                    <td>{item.type}</td>
                    <td>{item.advisor_name}</td>
                    <td>{item.co_advisor_name}</td>
                    <td>{item.remark}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
