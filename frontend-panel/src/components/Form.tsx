import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const Form = () => {
  const [batch, setBatch] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [coAdvisor, setCoAdvisor] = useState("");
  const [term, setTerm] = useState("");
  const [grade, setGrade] = useState("");
  const [remark, setRemark] = useState("");
  const [change, setChange] = useState(true);
  const [advisorData, setAdvisorData] = useState([]);
  const [active, setActive] = useState(false);

  const isValidate = () => {
    let proceed = true;
    let errMsg = "Enter your : ";
    if (batch === null || batch === "") {
      proceed = false;
      errMsg += "BCHA ";
    }
    if (studentId === null || studentId === "") {
      proceed = false;
      errMsg += "StudentId ";
    }
    if (studentName === null || studentName === "") {
      proceed = false;
      errMsg += "StudentName ";
    }
    if (type === null || type === "") {
      proceed = false;
      errMsg += "Type ";
    }
    if (remark === null || remark === "") {
      proceed = false;
      errMsg += "Remark ";
    }
    if (advisor === coAdvisor) {
      proceed = false;
      errMsg += "Advisor, don't repeat it. ";
    }

    if (!proceed) {
      toast.warning(errMsg);
      console.log(errMsg);
    }
    return proceed;
  };

  const saveData = async (e: any) => {
    e.preventDefault();
    if (isValidate()) {
      try {
        const response = await axios.post(
          `https://app-research-panel.onrender.com/api/student/add`,
          {
            student_id: studentId,
            batch: batch,
            student_name: studentName,
            type: type,
            topic: topic,
            advisor_name: advisor,
            co_advisor_name: coAdvisor,
            semester: term,
            grade: grade,
            remark: remark,
          }
        );
        // console.log(response);
        // console.log("PUT", response.status);
        if (response.status === 200) {
          toast.success("Update successfully.");
          // setReload(!reload);
        }
        // setEditId(null);
      } catch (err: any) {
        toast.error("Failed: " + err.message);
      }
    }
  };

  const saveDataAD = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://app-research-panel.onrender.com/api/advisor/add`,
        {
          advisor_name: advisor,
        }
      );
      // console.log(response);
      // console.log("PUT", response.status);
      if (response.status === 200) {
        toast.success("Update successfully.");
        setBatch("");
        setStudentId("");
        setStudentName("");
        setType("");
        setTopic("");
        setAdvisor("");
        setCoAdvisor("");
        setTerm("");
        setGrade("");
        setRemark("");
        // setReload(!reload);
      }
      // setEditId(null);
      // console.log(`test : ${response}`);
    } catch (err: any) {
      toast.error("Failed: " + err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app-research-panel.onrender.com/api/advisor"
        );
        setAdvisorData(response.data.data);
        // console.log(advisorData);
        setActive(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!active) {
      fetchData();
    }
  }, [active]);

  // send data student
  // const saveData = (e: any) => {
  //   e.preventDefault();
  //   if (isValidate()) {
  //     const formData = {
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
  //     console.log(formData);
  // setBatch("");
  // setStudentId("");
  // setStudentName("");
  // setType("");
  // setTopic("");
  // setAdvisor("");
  // setCoAdvisor("");
  // setTerm("");
  // setGrade("");
  // setRemark("");
  //   }
  // };

  // send data advisor
  // const saveDataAD = (e: any) => {
  //   e.preventDefault();

  //   const advisorData = {
  //     advisor: advisor,
  //   };
  //   setAdvisor("");
  //   console.log(advisorData);
  // };

  return (
    <div className="flex min-h-screen dark:bg-[#4c4d5c]">
      <div className="absolute left-2 top-[70px]">
        <button
          onClick={() => setChange(!change)}
          className="py-2 px-5 bg-[#3950cf] w-[100px] rounded-full"
        >
          Click
        </button>
      </div>
      {change ? (
        <div className="flex flex-col items-center m-auto sm:p-10 p-5 rounded-xl shadow-lg border w-[500px]">
          <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-[#478eeb]">
            StudentForm
          </h1>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={saveData} className="space-y-3">
              <label className="flex rounded-lg leading-10">
                <span className="w-1/2 flex items-center  justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                  BATCH
                </span>
                <input
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  type="number"
                  className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                  placeholder="BATCH"
                />
              </label>
              <label className="flex rounded-lg leading-10">
                <span className="w-1/2 flex items-center  justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                  ID
                </span>
                <input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  type="number"
                  className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                  placeholder="ID"
                />
              </label>
              <label className="flex rounded-lg leading-10">
                <span className="w-1/2 flex items-center  justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                  Full Name
                </span>
                <input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  type="text"
                  className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                  placeholder="Name"
                />
              </label>

              <div className="flex h-1/2 leading-10">
                <label
                  htmlFor="type"
                  className="w-[150px] px-9 flex items-center justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500"
                >
                  Type
                </label>
                <select
                  name="type"
                  onChange={(e) => setType(e.target.value)}
                  className="w-full appearance-none rounded-r-lg px-2 focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                >
                  <option className="text-[#8085bb]" value="">
                    Please Select type
                  </option>
                  <option className="text-[#131c85]" value="TH">
                    TH
                  </option>
                  <option className="text-[#131c85]" value="LS">
                    IS
                  </option>
                </select>
              </div>

              <label className="flex rounded-lg leading-10">
                <span className="w-1/2 flex items-center  justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                  Topic
                </span>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  type="text"
                  className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                  placeholder="Topic"
                />
              </label>

              <div className="flex h-1/2 leading-10">
                <label
                  htmlFor="Advisor"
                  className="w-[150px] px-9 flex items-center justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500"
                >
                  Advisor
                </label>
                <select
                  name="type"
                  onChange={(e) => setAdvisor(e.target.value)}
                  className="w-full appearance-none rounded-r-lg px-2 focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                >
                  <option className="text-[#8085bb]" value="">
                    Please Select Advisor
                  </option>

                  {advisorData.length === 0 ? (
                    <option>Error</option>
                  ) : (
                    advisorData.map((data: any, key) => (
                      <option
                        className="text-[#131c85]"
                        value={data.advisor_name}
                        key={key}
                      >
                        {data.advisor_name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="flex h-1/2 leading-10">
                <label
                  htmlFor="Advisor"
                  className="w-[190px] flex items-center justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500"
                >
                  Co-Advisor
                </label>
                <select
                  name="Co-Advisor"
                  onChange={(e) => setCoAdvisor(e.target.value)}
                  className="w-full appearance-none rounded-r-lg px-2 focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                >
                  <option className="text-[#8085bb]" value="">
                    Please Select Co-Advisor
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
              </div>

              <label className="flex rounded-lg leading-10">
                <span className="w-1/2 flex items-center  justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                  Semester
                </span>
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  type="text"
                  className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                  placeholder="Semester"
                />
              </label>
              <label className="flex rounded-lg leading-10">
                <span className="w-1/2 flex items-center  justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                  Grade
                </span>
                <input
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  type="text"
                  className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                  placeholder="Grade"
                />
              </label>
              <label className="flex rounded-lg leading-10">
                <span className="w-1/2 flex items-center  justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                  Remark
                </span>
                <input
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  type="text"
                  className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                  placeholder="Remark"
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" flex w-1/2 justify-center rounded-full rounded-tl-lg bg-[#3950cf] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  CONFIRM
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center m-auto sm:p-10 p-5 rounded-xl shadow-lg border-2 w-[500px]">
          <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-[#a3a1b3]">
            AdvisorForm
          </h1>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={saveDataAD} className="space-y-3">
              <label className="flex rounded-lg leading-10">
                <span className="w-1/2 flex items-center  justify-center bg-[#3950cf] text-white font-semibold rounded-l-lg hover:bg-indigo-500">
                  Advisor
                </span>
                <input
                  value={advisor}
                  onChange={(e) => setAdvisor(e.target.value)}
                  type="text"
                  className="w-full px-2 rounded-r-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#8278d9] focus:border-transparent ring-1 ring-inset ring-[#8278d9]"
                  placeholder="Advisor"
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" flex w-1/2 justify-center rounded-full rounded-tl-lg bg-[#8278d9] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  CONFIRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
