import React from "react";
import Outcomes from "./sidebarRightComponents/Outcomes";
import Predicates from "./sidebarRightComponents/Predicates";
import Actions from "./sidebarRightComponents/Actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TreeSideBarRight({ selectedOutcome, selectedEdge, nodes, treeId, treeName}) {
  return (
    <>
      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Outcomes</p>
        <Outcomes outcomes={selectedOutcome} />
      </div>
      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Predicate</p>
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
