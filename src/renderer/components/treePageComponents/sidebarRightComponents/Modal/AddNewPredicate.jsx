import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../../assets/close.png";

function AddNewPredicate ({ isOpen, onClose, onSave }) {
  const modalRef = useRef(null);


  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleSave = () => {
    onSave([actionInfo]);
    console.log(actionInfo)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleClickOutside}>
      <div ref={modalRef} className="relative flex flex-col justify-center items-center bg-background-green-100 w-fit h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
        {/* Title */}
        <h1 className='text-3xl font-rubik-bold font-bold mb-10'>New predicate</h1>
      </div>
    </div>
  );
}

export default AddNewPredicate;