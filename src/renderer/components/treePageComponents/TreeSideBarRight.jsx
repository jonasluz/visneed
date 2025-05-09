import React, { useEffect, useRef, useState } from "react";
import Outcomes from "./sidebarRightComponents/Outcomes";
import Predicates from "./sidebarRightComponents/Predicates";
import Actions from "./sidebarRightComponents/Actions";
import AddNewPredicate from "./sidebarRightComponents/Modal/AddNewPredicate";

import addIcon from "../../../assets/add-symbol-2.png"
import deleteIcon from "../../../assets/delete.png"

import 'react-toastify/dist/ReactToastify.css';

function TreeSideBarRight({ selectedOutcome, selectedEdge, nodes, onUpdateEdge, dictionary }) {
  const [isNewPredicateModal, setIsNewPredicateModal] = useState(false)

  const [selectedPredicateIndex, setSelectedPredicateIndex] = useState(null);
  
  //useRef
  const predicateContainerRef = useRef(null);
  const deleteButtonRef = useRef(null);

  useEffect(() => {
   function handleClickOutside(event) {
      if (
        predicateContainerRef.current &&
        !predicateContainerRef.current.contains(event.target) &&
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target)
      ) {
        setSelectedPredicateIndex(null); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeletePredicate = () => {
    if (!selectedPredicateIndex) return;

    const updatedEdge = [...selectedEdge];
    const edgeId = selectedPredicateIndex.edgeId;

    const edgeIndex = updatedEdge.findIndex(
      edge => `${edge.from}-${edge.to}` === edgeId
    );

    if (edgeIndex === -1) return;

    updatedEdge[edgeIndex].predicate = updatedEdge[edgeIndex].predicate.filter(
      (_, i) => i !== selectedPredicateIndex.index
    );

    onUpdateEdge(updatedEdge);
    setSelectedPredicateIndex(null);
  };

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
        dictionary={dictionary}
        />

      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <div className="flex flex-row w-full h-[20%] px-5 py-5 justify-between items-center">
          <label className="text-xl font-bold text-white">Outcomes</label>
        </div>
        <Outcomes outcomes={selectedOutcome} />
      </div>

      <div 
        ref={predicateContainerRef} 
        className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto"
      >
        <div className="flex flex-row w-full h-[15%] px-5 py-3 justify-between items-center">
          <label className="text-xl font-bold text-white">Predicate</label>
          <div className="flex w-fit h-full">
            <button 
              ref={deleteButtonRef}
              className={`h-full p-2 ${selectedEdge && selectedEdge.length === 1 ? 'block' : 'hidden'} ${selectedPredicateIndex === null ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-75'}`} 
              onClick={handleDeletePredicate} 
              disabled={selectedPredicateIndex === null}
            >
              <img src={deleteIcon} className="invert object-contain w-full h-full mr-4" />
            </button>
            <button className={`h-full p-2 ${selectedEdge && selectedEdge.length === 1 ? 'block' : 'hidden'}`} onClick={() => {setIsNewPredicateModal(true)}}>
              <img src={addIcon} alt="" className="invert object-contain w-full h-full"/>
            </button>
          </div>
        </div>
        <Predicates 
          edges={selectedEdge} 
          nodes={nodes} 
          onSelectPredicate={setSelectedPredicateIndex} 
          selectedIndex={selectedPredicateIndex} 
        />
      </div>

      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 backdrop-blur-sm rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Actions</p>
        <Actions edges={selectedEdge} nodes={nodes}/>
      </div>
    </>
  );
}

export default TreeSideBarRight;
