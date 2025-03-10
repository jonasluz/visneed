import React from "react";

function GoToHomeModal({ onConfirm, onCancel }) {
  return (
    <div className='h-full w-full bg-black bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center'>
      <div className='flex flex-col bg-background-green-100 w-[30%] h-[30%] p-8 rounded-lg items-center border justify-around'>
        <p className='text-3xl font-rubik-semibold tracking-wide text-background-white-100 my-2 w-[80%] text-center'>Go back to home screen?</p>
        <div className='flex flex-row justify-around w-[80%]'>
            <button onClick={onConfirm} className='bg-background-green-400 hover:brightness-50 duration-150 ease-in-out p-3 px-8 rounded-lg text-lg font-semibold font-rubik-semibold border border-black'>Confirm</button>
            <button onClick={onCancel} className='bg-background-red-300 hover:brightness-50 duration-150 ease-in-out p-3 px-8 rounded-lg text-lg font-semibold font-rubik-semibold border border-black'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default GoToHomeModal