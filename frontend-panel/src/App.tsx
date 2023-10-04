import { DataContext } from "./Context";
import { useContext } from "react";

function App() {
  const { data }: any = useContext(DataContext);
  console.log(data);

  return (
    <div className="bg-black min-h-screen w-screen">
      <img
        className="rounded-full m-auto p-[80px] w-[800px]"
        src="https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.6435-9/84190150_2884503264939006_8318157995041095680_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=X4aUhr5-Pe8AX_H_87M&_nc_ht=scontent.fbkk29-7.fna&oh=00_AfB4oCLHQ1G8ut0L7KzwgxKnXky6h2zcXqF5hTayfSh1JQ&oe=654376A5"
        alt=""
      />
    </div>
  );
}

export default App;
