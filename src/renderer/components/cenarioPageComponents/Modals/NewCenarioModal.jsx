import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewCenariModal({ isOpen, onClose, onUpdate, treeId }) {
  const modalRef = useRef(null);

  const [cenarioName, setCenarioName] = useState("")

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if(cenarioName == "") {
      toast.error("Name is empty")
    } else {
      console.log(treeId)
      await window.cenarioAPI.createNewCenario(cenarioName, treeId);
      onUpdate();
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toast.error("Canceled!");
      onClose();
    }
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-50 " onClick={handleClickOutside}>
      <div ref={modalRef} className="relative bg-background-green-100 w-fit h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
        {/* Title */}
        <div className='flex justify-center'>
          <h2 className="text-3xl font-rubik-bold font-bold mb-8">Create a new cenario:</h2>
        </div>

        <div className="mb-6 basis-1/3 px-4 font-medium">
            <label className="block text-sm mb-2">Name:</label>
            <input
              placeholder='Name of the cenario'
              type="text"
              className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
              value={cenarioName}
              onChange={(e) => setCenarioName(e.target.value)}
              spellCheck={false}
              />
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            className="bg-background-green-400 hover:brightness-50 ease-in-out duration-100 text-white text-sm p-4 px-8 mx-4 rounded font-semibold font-rubik-semibold border border-black"
            onClick={handleConfirm}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCenariModal;