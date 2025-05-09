import React, { useRef } from 'react';
import { toast } from 'react-toastify';

interface ConfirmCreateTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (confirm: boolean) => void;
  treeName: string;
}

function ConfirmCreateTreeModal({
  isOpen,
  onClose,
  onCreate,
  treeName,
}: ConfirmCreateTreeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleConfirmCreate = (confirm: boolean) => {
    if (!confirm) {
      toast.error("Creation canceled!");
    } else {
      onCreate(true);
    }
    onClose();
  };

  // Close when clicked outside modal
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toast.error("Creation canceled!");
      onClose();
    }
  };

  return (
    <div 
      className='h-full w-full bg-black bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center'
      onClick={handleClickOutside}>
      <div
        ref={modalRef}
        className='flex flex-col bg-background-green-100 w-fit h-fit p-10 rounded-lg items-center border'
        onClick={(e) => e.stopPropagation()}>
        <div className='h-[25%] w-full flex flex-col text-center py-2'>
          <p className='text-2xl font-rubik-semibold tracking-wide text-background-white-100 my-2'>
            You're about to create a project named:
            <p className='text-4xl font-rubik-bold font-bold my-6'>{treeName}</p>
          </p>
          <p className='text-xl font-rubik-semibold text-background-white-100'>
            Are you sure about this action?
          </p>
        </div>

        <div className='h-[20%] w-[70%] flex justify-around pt-2'>
          <button
            className='bg-background-green-400 hover:brightness-75 duration-150 ease-in-out p-3 px-8 rounded-lg text-lg font-semibold font-rubik-semibold border border-black'
            onClick={() => handleConfirmCreate(true)}>
            Yes
          </button>
          <button
            className='bg-background-red-300 hover:brightness-75 duration-150 ease-in-out p-3 px-8 rounded-lg text-lg font-semibold font-rubik-semibold border border-black'
            onClick={() => handleConfirmCreate(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCreateTreeModal;
