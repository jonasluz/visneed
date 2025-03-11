import React from "react";

function DeleteNodeModal({ isOpen, onClose, selectedNode, onConfirm }) {
  if (!isOpen) return null;
  console.log(selectedNode);

  const handleConfirm = () => {
    onConfirm(selectedNode.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col bg-background-green-100 w-[50%] h-[60%] p-6 rounded-lg justify-center items-center">
        <div className="flex flex-col w-[60%] h-[90%]">
          <div className="flex flex-row justify-center p-2">
            <p className="text-2xl font-rubik-semibold">You are about to deleted the node&nbsp;</p>
            <p className="text-2xl font-rubik-semibold underline underline-offset-2">
              {selectedNode.name}!
            </p>
          </div>
          <p className="text-center p-3">What you want to do with the leafs?</p>
          <div className="flex flex-row w-full h-[40%] justify-around p-4">
            <div className="p-6 rounded-lg  w-[30%] text-center bg-background-green-100 hover:bg-background-green-200 hover:shadow-background-green-400 hover:shadow-md duration-150 ease-in hover:-translate-y-2 cursor-pointer">
              Create a new tree
            </div>
            <div className="p-6 rounded-lg  w-[30%] text-center bg-background-green-100 hover:bg-background-green-200 hover:shadow-background-green-400 hover:shadow-lg duration-150 ease-in hover:-translate-y-3">
              Substitute the deleated node
            </div>
          </div>
          <div className="flex flex-row justify-around w-full border">
            <button
              className="bg-background-green-400 hover:brightness-50 duration-150 ease-in-out p-3 px-8 rounded-lg text-lg font-semibold font-rubik-semibold border border-black"
              onClick={handleConfirm}
            >
              Delete
            </button>
            <button
              className="bg-background-red-300 hover:brightness-50 duration-150 ease-in-out p-3 px-8 rounded-lg text-lg font-semibold font-rubik-semibold border border-black"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteNodeModal;
