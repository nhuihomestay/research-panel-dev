import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div className="bg-[#C9DDFF] h-[4rem] flex justify-between items-center px-4 fixed w-full">
        <div className="sm:w-[50px] w-[40px]">
          <img
            className="rounded-full"
            src="https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.6435-9/84190150_2884503264939006_8318157995041095680_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=X4aUhr5-Pe8AX_H_87M&_nc_ht=scontent.fbkk29-7.fna&oh=00_AfB4oCLHQ1G8ut0L7KzwgxKnXky6h2zcXqF5hTayfSh1JQ&oe=654376A5"
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
