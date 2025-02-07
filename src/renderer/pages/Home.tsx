import React from "react";
import Sidebar from "../components/Sidebar";
import NewTree from "../components/NewTree";

function Home() {
  return (
    <div className="flex flex-row bg-background-green-100 min-h-screen">
      <div className="w-1/6 h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col w-5/6">
        <NewTree />
      </div>
    </div>
  );
}

export default Home;
