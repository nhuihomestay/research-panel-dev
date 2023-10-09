// import { DataContext } from "./Context";
// import { useContext } from "react";
import { Track } from "./components/Track";

function App() {
  // const { data }: any = useContext(DataContext);

  return (
    <div className="bg-black min-h-screen w-screen">
      <Track />
    </div>
  );
}

export default App;
