import { useState, useContext, useEffect } from "react";
// import { DataContext } from "../Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const advisorData = [
  { advisor: "ดร.ธัญญรัตน์" },
  { advisor: "ดร.คงศักดิ์" },
  { advisor: "ดร.อารีรัตน์" },
  { advisor: "ดร.นปภา" },
  { advisor: "ดร.อภิรดา" },
  { advisor: "ดร.วิภัสสร" },
  { advisor: "ดร.นันทวัน" },
];

export const Track = () => {
  const [batch, setbatch] = useState<string>("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [coAdvisor, setCoAdvisor] = useState("");
  const [term, setTerm] = useState("");
  const [grade, setGrade] = useState("");
  const [remark, setRemark] = useState("");
  const [editId, setEditId] = useState(0);
  // const { data }: any = useContext(DataContext);

  // const isValidate = () => {
  //   let proceed = true;
  //   let errMsg = "Enter your : ";
  //   if (advisor === coAdvisor) {
  //     proceed = false;
  //     errMsg += "Advisor, don't repeat it. ";
  //   }
  //   if (!proceed) {
  //     alert(errMsg);
  //     console.log(errMsg);
  //   }
  //   return proceed;
  // };

  // const updateData = (e: any, id: any) => {
  //   e.preventDefault();
  //   if (isValidate()) {
  //     const advisorData = {
  //       id: id,
  //       studentId: studentId,
  //       batch: batch,
  //       studentName: studentName,
  //       type: type,
  //       topic: topic,
  //       advisor: advisor,
  //       coAdvisor: coAdvisor,
  //       term: term,
  //       grade: grade,
  //       remark: remark,
  //     };
  //     console.log(advisorData);
  //   }
  // };
  // id: id,
  //         student_id: studentId ? studentId : '',
  //         batch: batch,
  //         student_name: studentName,
  //         type: type,
  //         topic: topic,
  //         advisor_name: advisor,
  //         co_advisor_name: coAdvisor,
  //         semester: term,
  //         grade: grade,
  //         remark: remark,

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/student/");
        setData(response.data.data);
        console.log(`Data na ka : ${data}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const updateData = async (e: any, id: any) => {
    e.preventDefault();
    const studentData: any = {};

    if (id !== "") studentData.student_id = id;
    if (studentId !== "") studentData.new_student_id = studentId;
    if (studentName !== "") studentData.student_name = studentName;
    if (type !== "") studentData.type = type;
    if (topic !== "") studentData.topic = topic;
    if (advisor !== "") studentData.advisor_name = advisor;
    if (coAdvisor !== "") studentData.co_advisor_name = coAdvisor;
    if (grade !== "") studentData.grade = grade;
    if (batch !== "") studentData.batch = batch;
    if (remark !== "") studentData.remark = remark;
    if (term !== "") studentData.semester = term;

    console.log(studentData);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/student/update`,
        studentData
      );
      console.log(response);
      console.log("PUT", response.status);
      if (response.status === 200) {
        toast.success("Update successfully.");
        // setReload(!reload);
      }
      setbatch("");
      setStudentId("");
      setStudentName("");
      setType("");
      setTopic("");
      setAdvisor("");
      setCoAdvisor("");
      setTerm("");
      setGrade("");
      setRemark("");
      // setEditId(null);
    } catch (err: any) {
      toast.error("Failed: " + err.message);
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen ">
        <h1 className="text-center mx-auto text-2xl py-5 text-white">TRACK</h1>
        <div className="">
          <table className="mx-auto divide-y-2 divide-gray-500">
            <thead className="bg-[#C9DDFF]">
              <tr>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  No.
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  batch
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
                  Topic
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Advisor
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Co-Advisor
                </th>
                <th className="w-[200px] px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Semester
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Grade
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Remark
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Edit
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {data.map((data: any, index: any) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {data._id === editId ? (
                      <>
                        <input
                          value={batch || data.batch}
                          onChange={(e) => {
                            setbatch(e.target.value);
                          }}
                          type="text"
                          className="w-[55px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="batch"
                        />
                      </>
                    ) : (
                      data.batch
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {data._id === editId ? (
                      <>
                        <input
                          value={data.studentId || studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          type="text"
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="ID"
                        />
                      </>
                    ) : (
                      data.student_id.$numberLong
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                    {data._id === editId ? (
                      <>
                        <input
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          type="text"
                          className="w-[150px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="Name"
                        />
                      </>
                    ) : (
                      data.student_name
                    )}
                  </td>
                  <td className="text-sm text-gray-500 dark:text-gray-300">
                    {data._id === editId ? (
                      <>
                        <div className="flex leading-2">
                          <label
                            htmlFor="type"
                            className="w-full px-2 flex items-center justify-center bg-[#c938c1] text-white font-semibold hover:bg-indigo-500"
                          >
                            Type
                          </label>
                          <select
                            value={data.type || type}
                            name="type"
                            onChange={(e) => setType(e.target.value)}
                            className="w-[40px] appearance-none px-2 text-black focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                          >
                            <option
                              className="text-[#131c85] placeholder-black "
                              value="TH"
                            >
                              TH
                            </option>
                            <option className="text-[#131c85]" value="LS">
                              IS
                            </option>
                          </select>
                        </div>
                      </>
                    ) : (
                      data.type
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 overflow-y-auto w-[200px]">
                    {data._id === editId ? (
                      <>
                        <input
                          value={topic || data.topic}
                          onChange={(e) => setTopic(e.target.value)}
                          type="text"
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="Topic"
                        />
                      </>
                    ) : (
                      data.topic
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                    {data._id === editId ? (
                      <>
                        <select
                          name="advisor"
                          onChange={(e) => setAdvisor(e.target.value)}
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
                        >
                          <option className="text-[#8085bb]" value="">
                            Select
                          </option>

                          {advisorData.map((data, key) => (
                            <option
                              className="text-[#131c85]"
                              value={data.advisor}
                              key={key}
                            >
                              {data.advisor}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      data.advisor_name
                    )}
                  </td>
                  <td className="w-[150px] px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {data._id === editId ? (
                      <>
                        <select
                          name="Co-Advisor"
                          onChange={(e) => setCoAdvisor(e.target.value)}
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
                        >
                          <option className="text-[#8085bb]" value="">
                            Select
                          </option>

                          {advisorData.map((data, key) => (
                            <option
                              className="text-[#131c85]"
                              value={data.advisor}
                              key={key}
                            >
                              {data.advisor}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      data.co_advisor_name
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                    {data._id === editId ? (
                      <>
                        <input
                          value={term || data.semester}
                          onChange={(e) => setTerm(e.target.value)}
                          type="text"
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="Semester"
                        />
                      </>
                    ) : (
                      data.semester
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {data._id === editId ? (
                      <>
                        <input
                          value={grade || data.grade}
                          onChange={(e) => setGrade(e.target.value)}
                          type="text"
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="Grade"
                        />
                      </>
                    ) : (
                      data.grade
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {data._id === editId ? (
                      <>
                        <input
                          value={remark || data.remark}
                          onChange={(e) => setRemark(e.target.value)}
                          type="text"
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="Remark"
                        />
                      </>
                    ) : (
                      data.remark
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300  flex">
                    <button
                      className="flex justify-center items-center h-6 px-5 ml-4 bg-yellow-600 rounded font-semibold text-blue-100 hover:bg-yellow-300 text-[12px]"
                      onClick={() => setEditId(editId === 0 ? data._id : 0)}
                    >
                      Edit
                    </button>

                    {data._id === editId ? (
                      <>
                        <button
                          onClick={(e) => updateData(e, data._id)}
                          className="flex justify-center items-center h-6 px-2 ml-4 rounded font-semibold text-blue-100  text-[12px] bg-blue-600  hover:bg-blue-800"
                        >
                          Update
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
