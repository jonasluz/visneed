import React from "react";

function TreeSideBarRight() {
  return (
    <>
      <div className="h-[10%] flex justify-center bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2">
        <button className="w-full h-full">
          <p className="text-2xl text-white font-semibold">Export Data</p>
        </button>
      </div>
      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 p-5">
        <p className="text-xl font-bold text-white">Outcomes</p>
        <div className="flex justify-center items-center h-full">
            <p className="text-lg font-medium text-white">No outcomes for this node</p>
        </div>
      </div>
      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 p-5">
        <p className="text-xl font-bold text-white">Predicate</p>
        <div className="flex justify-center items-center h-full">
            <p className="text-lg font-medium text-white">No predicate yet</p>
        </div>
      </div>
      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 p-5">
        <p className="text-xl font-bold text-white">Actions</p>
        <div className="flex justify-center items-center h-full">
            <p className="text-lg font-medium text-white">No actions for this node</p>
        </div>
      </div>
    </>
  );
}

export default TreeSideBarRight;
