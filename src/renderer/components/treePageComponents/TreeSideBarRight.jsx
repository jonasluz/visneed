import React, { useState } from "react";
import Outcomes from "./sidebarRightComponents/Outcomes";
import Predicates from "./sidebarRightComponents/Predicates";
import Actions from "./sidebarRightComponents/Actions";
import AddNewPredicate from "./sidebarRightComponents/Modal/AddNewPredicate";

import addIcon from "../../../assets/add-symbol-2.png"

import 'react-toastify/dist/ReactToastify.css';

function TreeSideBarRight({ selectedOutcome, selectedEdge, nodes, treeId, treeName, onUpdateEdge }) {
  const [isNewPredicateModal, setIsNewPredicateModal] = useState(false)

  const handleAddPredicate = (newPredicate) => {
    const updatedEdge = selectedEdge;
    console.log(updatedEdge)
    
    if (!updatedEdge[0].predicate || updatedEdge.predicate === "No predicates") {
      updatedEdge.predicate = [newPredicate];
    } else {
      updatedEdge[0].predicate = [...updatedEdge[0].predicate, newPredicate];
    }
    onUpdateEdge(updatedEdge);
  };
  
  return (
    <>
      <AddNewPredicate  
        isOpen={isNewPredicateModal}
        onClose={() => setIsNewPredicateModal(false)}
        onSave={handleAddPredicate}
        nodes={nodes}
      />

      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <div className="flex flex-row w-full h-[20%] px-5 py-5 justify-between items-center">
          <label className="text-xl font-bold text-white">Outcomes</label>
        </div>
        <Outcomes outcomes={selectedOutcome} />
      </div>
      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <div className="flex flex-row w-full h-[15%] px-5 py-3 justify-between items-center">
          <label className="text-xl font-bold text-white">Predicate</label>
          <button className={`h-full ${selectedEdge && selectedEdge.length === 1 ? 'block' : 'hidden'}`} onClick={() => {setIsNewPredicateModal(true)}}>
            <img src={addIcon} alt="" className="invert object-contain w-full h-full"/>
          </button>
        </div>
        <Predicates edges={selectedEdge} nodes={nodes} />
        {console.log(selectedEdge)}
      </div>
      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Actions</p>
        <Actions edges={selectedEdge} nodes={nodes}/>
      </div>
    </>
  );
}

export default TreeSideBarRight;
