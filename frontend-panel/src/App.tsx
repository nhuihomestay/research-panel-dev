import { DataContext } from "./Context";
import { useContext } from "react";

function App() {
  const { data }: any = useContext(DataContext);
  console.log(data);

  return (
    <div className="bg-black min-h-screen w-screen">
      <img
        className="rounded-full m-auto p-[80px] w-[800px]"
        src="https://scontent.fbkk29-5.fna.fbcdn.net/v/t31.18172-8/27798012_1571078242968927_7511311327029328313_o.jpg?_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=eei6XFNDAPEAX8wZdGU&_nc_ht=scontent.fbkk29-5.fna&oh=00_AfDmub_jrc6uClFCpcUgbtAQW8lO7-KbdLf84SRQ4EkxWQ&oe=654504D4"
        alt=""
      />
    </div>
  );
}

export default App;
