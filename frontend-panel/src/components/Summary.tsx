import { useState, useContext } from "react";
import { DataContext } from "../Context";

export const Summary = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() + 543;
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const currentDateTime = new Intl.DateTimeFormat("th-TH", options).format(
    currentDate
  );
  const [advisors, setAdvisors] = useState<string>();
  const { data }: any = useContext(DataContext);
  console.log(data);
  const foundItems = data.filter(
    (item: any) => item.advisor_name && item.advisor_name.includes(advisors)
  );

  console.log(foundItems);
  console.log(advisors);

  const advisorData = [
    { advisor: "ดร.ธัญญรัตน์" },
    { advisor: "ดร.คงศักดิ์" },
    { advisor: "ดร.อารีรัตน์" },
    { advisor: "ดร.นปภา" },
    { advisor: "ดร.อภิรดา" },
    { advisor: "ดร.วิภัสสร" },
    { advisor: "ดร.นันทวัน" },
  ];

  return (
    <>
      <div className="bg-gray-500 min-h-screen pt-[80px]">
        <h1 className="text-center mx-auto text-3xl py-5 text-white">
          ภาระงานอาจารย์ที่ปรึกษาวิทยานิพนธ์และการค้นคว้าอิสระ ปีการศึกษา{" "}
          {currentYear}
        </h1>
        <div className="text-white mx-auto flex justify-center">
          <select
            value={advisors}
            name="advisor"
            onChange={(e) => setAdvisors(e.target.value)}
            className="w-[100px] px-2 placeholder:text-sm text-sm text-black rounded-lg"
          >
            <option className="text-[#8085bb]" value="">
              Select
            </option>

            {advisorData.map((data, key) => (
              <option className="text-[#131c85]" value={data.advisor} key={key}>
                {data.advisor}
              </option>
            ))}
          </select>
          <h1 className="text-2xl mx-10">{advisors}</h1>
        </div>
        <p className="text-white mx-auto text-center text-xl my-3">
          ข้อมูลวันที่ {currentDateTime}
        </p>
        <div className="">
          <table className="mx-auto divide-y-2 divide-gray-500">
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
                <th className="w-[100px] px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Advisor
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Co-Advisor
                </th>
                <th className="w-[200px]  px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  LookReal
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Remark
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {foundItems.map((item: any, index: any) => (
                <tr className="">
                  <td className="">{index + 1}</td>
                  <td>{item.student_id.$numberLong}</td>
                  <td>{item.student_name}</td>
                  <td>{item.type}</td>
                  <td>{item.advisor_name}</td>
                  <td>{item.co_advisor_name}</td>
                  <td>{item.semester}</td>
                  <td>{item.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
