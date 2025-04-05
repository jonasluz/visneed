import React from "react";
import Outcomes from "./sidebarRightComponents/Outcomes";
import Predicates from "./sidebarRightComponents/Predicates";
import Actions from "./sidebarRightComponents/Actions";

import addIcon from "../../../assets/add-symbol-2.png"

import 'react-toastify/dist/ReactToastify.css';

function TreeSideBarRight({ selectedOutcome, selectedEdge, nodes, treeId, treeName}) {
  return (
    <>
      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Outcomes</p>
        <Outcomes outcomes={selectedOutcome} />
      </div>
      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <div className="flex flex-row w-full h-[20%] px-5 py-5 justify-between items-center">
          <label className="text-xl font-bold text-white">Predicate</label>
          <button className="h-[80%]">
            <img src={addIcon} alt="" className="object-contain w-full h-full"/>
          </button>
        </div>
        <Predicates edges={selectedEdge} nodes={nodes} />
      </div>
      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Actions</p>
        <Actions edges={selectedEdge} nodes={nodes}/>
      </div>
    </>
  );
}

export default TreeSideBarRight;
