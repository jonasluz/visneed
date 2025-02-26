import React from "react";
import Outcomes from "./sidebarRightComponents/Outcomes";
import Predicates from "./sidebarRightComponents/Predicates";
import Actions from "./sidebarRightComponents/Actions";

function TreeSideBarRight({ selectedOutcome, selectedEdge, nodes }) {
  console.log(selectedOutcome)
  return (
    <>
      <div className="h-[10%] flex justify-center bg-background-green-200 hover:brightness-150 duration-100 ease-in-out bg-opacity-80 rounded-lg my-4 mx-2">
        <button className="w-full h-full">
          <p className="text-2xl text-white font-semibold">Export Data</p>
        </button>
      </div>
      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 p-5">
        <p className="text-xl font-bold text-white">Outcomes</p>
        <div className="flex justify-center items-center h-full">
            <Outcomes outcomes={selectedOutcome} />
        </div>
      </div>
      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Predicate</p>
          <Predicates predicates={selectedEdge} nodes={nodes} />
      </div>
      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 p-5">
        <p className="text-xl font-bold text-white">Actions</p>
        <div className="flex justify-center items-center h-full">
            <Actions actions={selectedEdge}/>
        </div>
      </div>
    </>
  );
}

export default TreeSideBarRight;
