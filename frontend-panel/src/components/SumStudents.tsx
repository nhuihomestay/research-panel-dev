import { useContext } from "react";
import { DataContext } from "../Context";


export const SumStudents = () => {
  const { data }: any = useContext(DataContext);
  return (
    <div className="pt-40">
    <table>
    <thead>
      <tr>
        <th>รหัสนักศึกษา</th>
        <th>ชื่อ-สกุล</th>
        <th>TH/IS</th>
        <th>อาจารย์ที่ ปรึกษาหลัก</th>
        <th>อาจารย์ที่ปรึกษาร่วม</th>
        <th>ดูจริง(ไหม)?</th>
        <th>Remark</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item:any) => (
        <tr key={item._id.$oid}>
          <td>{item.student_id.$numberLong}</td>
          <td>{item.student_name}</td>
          <td>{item.type}</td>
          <td>{item.advisor_name}</td>
          <td>{item.co_advisor_name}</td>
          <td>{item.semester}</td>
          <td>{item.Remark}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
);
};

