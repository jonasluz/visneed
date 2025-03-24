import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../assets/close.png";

function EditNodeModal ({ isOpen, onClose }) {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toast.error("Action canceled!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleClickOutside}>
      <div ref={modalRef} className="relative bg-background-green-100 w-fit h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
      <button className='absolute w-8 h-8 top-5 right-5 cursor-pointer' onClick={() => {onClose(); toast.error("Action canceled!")}}>
        <img src={closeIcon} alt="" className='w-full h-full object-contain' />
      </button>
      </div>
    </div>
  );
}

export default EditNodeModal;