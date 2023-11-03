import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div className="bg-[#C9DDFF] h-[4rem] flex justify-between items-center px-4 fixed w-full">
        <div className="sm:w-[50px] w-[40px]">
          <img
            className="rounded-md h-10"
            src="https://scontent.fbkk29-1.fna.fbcdn.net/v/t39.30808-6/366367117_6694022813987013_5067234080579539244_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OH14R1A3M5wAX_kVTc2&_nc_ht=scontent.fbkk29-1.fna&oh=00_AfCDwgLwzZrNsYRHQDd13cA88cz0TNJpuqZ5zl9B1HJDPg&oe=6549D801"
            alt="logo"
          />
        </div>
        <ul className="flex gap-5">
          <Link to={"/"}>
            <li className="font-bold text-xl text-gray-500">Home</li>
          </Link>
          <Link to={"/Form"}>
            <li className="font-bold text-xl text-gray-500">Form</li>
          </Link>
          <Link to={"/Track"}>
            <li className="font-bold text-xl text-gray-500">Track</li>
          </Link>
          <Link to={"/Summary"}>
            <li className="font-bold text-xl text-gray-500">Advisor</li>
          </Link>
          <Link to={"/SumStudents"}>
            <li className="font-bold text-xl text-gray-500">Students</li>
          </Link>
        </ul>
      </div>
    </>
  );
};
