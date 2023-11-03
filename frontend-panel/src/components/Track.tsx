import { useState, useEffect } from "react";
// import { DataContext } from "../Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// const advisorData = [
//   { advisor: "ดร.ธัญญรัตน์" },
//   { advisor: "ดร.คงศักดิ์" },
//   { advisor: "ดร.อารีรัตน์" },
//   { advisor: "ดร.นปภา" },
//   { advisor: "ดร.อภิรดา" },
//   { advisor: "ดร.วิภัสสร" },
//   { advisor: "ดร.นันทวัน" },
// ];

export const Track = () => {
  const [batch, setbatch] = useState<string>("");
  // const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [coAdvisor, setCoAdvisor] = useState("");
  const [term, setTerm] = useState("");
  const [grade, setGrade] = useState("");
  const [remark, setRemark] = useState("");
  const [editId, setEditId] = useState(0);
  const [data, setData] = useState([]);
  const [advisorData, setAdvisorData] = useState([]);
  const [graduated, setGraduated] = useState("");
  const [active, setActive] = useState(false);
  const [activeS, setActiveS] = useState(false);
  // const { data }: any = useContext(DataContext);
  const [finishing, setFinishing] = useState(false);

  // console.log(finishing);

  const handleclick = () => {
    setFinishing(!finishing);
    setActiveS(!true);
  };

  const isValidate = (advisor_name: any, co_advisor_name: any) => {
    let proceed = true;
    let errMsg = "Enter your : ";
    if (advisor === coAdvisor) {
      proceed = false;
      errMsg += "Advisor, don't repeat it. ";
    }
    if (coAdvisor === advisor_name) {
      proceed = false;
      errMsg += "Advisor, don't repeat it. ";
    }

    if (advisor === co_advisor_name) {
      proceed = false;
      errMsg += "Advisor, don't repeat it. ";
    }

    if (!proceed) {
      toast.error(errMsg);
      // console.log(errMsg);
    }
    return proceed;
  };

  // get student
  useEffect(() => {
    const fetchDataSd = async () => {
      try {
        const response = await axios.get(
          "https://app-research-panel.onrender.com/api/student",
          {
            params: {
              is_graduated: Boolean(finishing),
            },
          }
        );
        setData(response.data.data);
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

  // get adisor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app-research-panel.onrender.com/api/advisor"
        );
        setAdvisorData(response.data.data);
        setActive(true);
        // console.log(`Advisor : ${advisorData}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!active) {
      fetchData();
    }
  }, [active, finishing]);

  const updateData = async (
    e: any,
    student_id: any,
    advisor_name: any,
    co_advisor_name: any
  ) => {
    e.preventDefault();
    const studentData: any = {};
    studentData.student_id = String(student_id);
    // if (studentId !== "") studentData.new_student_id = studentId;
    if (studentName !== "") studentData.student_name = studentName;
    if (type !== "") studentData.type = type;
    if (topic !== "") studentData.topic = topic;
    if (isValidate(String(advisor_name), String(co_advisor_name))) {
      if (advisor !== "") studentData.advisor_name = advisor;
      if (coAdvisor !== "") studentData.co_advisor_name = coAdvisor;
    }
    if (grade !== "") studentData.grade = grade;
    if (batch !== "") studentData.batch = batch;
    if (remark !== "") studentData.remark = remark;
    if (term !== "") studentData.semester = term;
    if (graduated !== "") studentData.is_graduated = graduated;
    // console.log(typeof graduated);
    // console.log(typeof Boolean(graduated));
    // console.log(studentData);

    try {
      const response = await axios.put(
        `https://app-research-panel.onrender.com/api/student/update`,
        studentData
      );

      // console.log(response);
      // console.log("PUT", response.status);
      setEditId(0);
      setActiveS(!true);
      if (response.status === 200) {
        toast.success("Update successfully.");
      }
      setbatch("");
      // setStudentId("");
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageNumbers = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); 

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  // DELETE
  const deleteDate = async (id: any) => {
    try {
      const response = await axios.delete(
        `https://app-research-panel.onrender.com/api/student/delete`,
        { data: { student_id: id } }
      );
      console.log("DELETE", response.status);
      if (response.status === 200) {
        toast.success("Delete successfully.");
        setActiveS(!true);
      }
    } catch (err: any) {
      toast.error("Failed: " + err.message);
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen w-screen">
        <h1 className="text-center mx-auto text-2xl py-5 text-white">TRACK</h1>
        <div className="">
          <button
            onClick={handleclick}
            className="bg-white rounded-md px-2 absolute"
          >
            Finish studying
          </button>
          <ul className="text-white font-bold text-xl flex space-x-2 justify-center py-1">
            {Array.from({ length: pageNumbers }).map((_, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
          <table className="mx-auto divide-y-2 divide-gray-500">
            <thead className="bg-[#C9DDFF]">
              <tr>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  No.
                </th>
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  BATCH
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
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Semester
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
                <th className="px-4 py-3.5 text-sm text-center rtl:text-right text-gray-500">
                  Edit
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {currentItems.map((data: any, index: any) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {data._id === editId ? (
                      <>
                        <input
                          value={batch}
                          onChange={(e) => {
                            setbatch(e.target.value);
                          }}
                          type="text"
                          className="w-[55px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="batch"
                        />
                      </>
                    ) : (
                      <p>รุ่นที่ {data.batch}</p>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {data.student_id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
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
                          {/* <label
                            htmlFor="type"
                            className="w-full px-2 flex items-center justify-center bg-[#c938c1] text-white font-semibold hover:bg-indigo-500"
                          >
                            Type
                          </label> */}
                          <select
                            value={type}
                            name="type"
                            onChange={(e) => setType(e.target.value)}
                            className="w-[60px] appearance-none px-2 text-black focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                          >
                            <option className="text-[#8085bb]" value="">
                              Select
                            </option>
                            <option className="text-[#131c85]" value="TH">
                              TH
                            </option>
                            <option className="text-[#131c85]" value="IS">
                              IS
                            </option>
                          </select>
                        </div>
                      </>
                    ) : (
                      data.type
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {data._id === editId ? (
                      <>
                        <input
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          type="text"
                          className="px-2 placeholder:text-sm text-sm text-black"
                          placeholder="Topic"
                        />
                      </>
                    ) : (
                      <div className="max-h-12 w-[200px] overflow-auto">
                        {data.topic}
                      </div>
                    )}
                  </td>
                  {/* advidor */}
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {data._id === editId ? (
                      <>
                        <select
                          value={advisor}
                          name="advisor"
                          onChange={(e) => setAdvisor(e.target.value)}
                          className="px-2 placeholder:text-sm text-sm text-black"
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
                      </>
                    ) : (
                      data.advisor_name
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {data._id === editId ? (
                      <>
                        <select
                          value={data.advisor || coAdvisor}
                          name="Co-Advisor"
                          onChange={(e) => setCoAdvisor(e.target.value)}
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
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
                      </>
                    ) : (
                      data.co_advisor_name
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                    {data._id === editId ? (
                      <>
                        <input
                          value={term}
                          onChange={(e) => setTerm(e.target.value)}
                          type="text"
                          className="w-[100px] px-2 placeholder:text-sm text-sm text-black"
                          placeholder="Semester"
                        />
                      </>
                    ) : (
                      <div className="max-h-12 w-[150px] overflow-auto">
                        {data.semester}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {data._id === editId ? (
                      <>
                        <input
                          value={grade}
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
                          value={remark}
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
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {data._id === editId ? (
                      <>
                        <select
                          value={graduated}
                          name="type"
                          onChange={(e: any) => setGraduated(e.target.value)}
                          className="w-[50px] appearance-none px-2 text-black focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                        >
                          <option className="text-[#8085bb]" value="">
                            Select
                          </option>
                          <option className="text-[#131c85]" value="false">
                            False
                          </option>
                          <option className="text-[#131c85]" value="true">
                            True
                          </option>
                        </select>
                      </>
                    ) : (
                      data.is_graduated.toString()
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
                          onClick={(e) =>
                            updateData(
                              e,
                              data.student_id,
                              data.advisor_name,
                              data.co_advisor_name
                            )
                          }
                          className="flex justify-center items-center h-6 px-2 ml-4 rounded font-semibold text-blue-100  text-[12px] bg-blue-600  hover:bg-blue-800"
                        >
                          Update
                        </button>
                      </>
                    ) : null}
                    {finishing === true ? (
                      <button
                        className="flex justify-center items-center h-6 px-2 ml-4 rounded font-semibold text-blue-100  text-[12px] bg-red-600  hover:bg-blue-800"
                        onClick={() => deleteDate(data.student_id)}
                      >
                        Delete
                      </button>
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
