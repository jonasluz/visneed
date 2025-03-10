import React, { useState } from 'react'

import deleteTreeIcon from '../../../../assets/deletingTree.png'
import { toast } from 'react-toastify'

function ConfirmDeleteModal({ isOpen, onClose, onDelete}) {
  
  if(!isOpen) return null

  const handleConfirmDelete = (confirm) => {
    if (!confirm) {
      toast.error("Deletion canceled!");
    } else {
      onDelete(true);
    }
    onClose();
  };

  return (
    <div className='h-full w-full bg-black bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center'>
      <div className='flex flex-col justify-center bg-background-green-100 w-[40%] h-[55%] p-6 rounded-lg items-center border'>
        <div className='h-[55%] w-[70%] flex justify-center py-2'>
          <img src={deleteTreeIcon} alt="" className='h-full'/>
        </div>
        
        <div className='h-[25%] w-[70%] flex flex-col text-center py-2'>
          <p className='text-3xl font-rubik-semibold tracking-wide text-background-white-100 my-2'>You will remove this tree</p>
          <p className='text-xl font-rubik-semibold text-background-white-100'>Are you sure about this action?</p>
        </div>

        <div className='h-[15%] w-[70%] flex justify-around py-2'>
          <button 
          className='bg-background-red-300 hover:brightness-50 duration-150 ease-in-out p-3 px-8 rounded-lg text-lg font-semibold font-rubik-semibold border border-black'
          onClick={() => { handleConfirmDelete(true) }}>
            Delete
          </button>
          <button 
          className='bg-background-green-400 hover:brightness-50 duration-150 ease-in-out p-3 px-8 rounded-lg text-lg font-semibold font-rubik-semibold border border-black'
          onClick={() => { handleConfirmDelete(false) }}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal