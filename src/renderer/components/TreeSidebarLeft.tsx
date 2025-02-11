import React from "react";
import User from "./User";
function TreeSidebarLeft() {
  return (
    <div className="flex flex-col bg-background-green-200 w-full h-full bg-opacity-70">
      <div className="flex flex-row w-full h-[15%] items-center justify-around">
        <p className="text-3xl font-bold text-white">Vis Need</p>
      </div>
      <div className="flex flex-col h-[45%] p-4 border-b">
        <h1 className="text-xl font-bold text-white">Nodes</h1>
      </div>
      <div className="flex flex-col h-[30%] p-4 border-b">
        <h1 className="text-xl font-bold text-white">Connections</h1>
      </div>
      <div className="flex flex-col h-[10%] justify-center p-6">
        <button className="bg-background-green-400 p-2 rounded-lg">
          <p className="text-lg font-semibold">Import</p>
        </button>
      </div>
    </div>
  );
}

export default TreeSidebarLeft;