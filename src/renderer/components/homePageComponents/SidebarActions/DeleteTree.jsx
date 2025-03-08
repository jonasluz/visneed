import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "Unknown";

  const lastModifiedDate = new Date(timestamp);
  // console.log(lastModifiedDate)
  const now = new Date();
  const diffInSeconds = Math.floor((now - lastModifiedDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;

  return `${Math.floor(diffInMonths / 12)} years ago`;
};

function DeleteTree({ trees }) {
  const [allTrees, setAllTrees] = useState(trees);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedTreeId, setSelectedTreeId] = useState(null);
  
  const handleDelete = async (treeId) => {    
    const response = await window.treeAPI.deleteTree(treeId);
    if (response) {
      const newTreeList = await window.treeAPI.getSavedTrees();
      setAllTrees(newTreeList);
      toast.success("Tree delete with success");
    }
  };

  const handleDeleteClick = (treeId) => {
    setSelectedTreeId(treeId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (confirm) => {
    if (confirm && selectedTreeId) {
      handleDelete(selectedTreeId);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="h-full">
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
      <p className="text-2xl font-semibold text-white font-rubik-semibold self-start px-5 pt-5 mx-10">
        My trees:
      </p>
      <p className="text-white opacity-60 font-rubik self-start px-5 pb-5 mx-10">Hover over one of the trees</p>
      <div className="flex flex-col h-[91%] items-center overflow-y-auto scrollbar-none">
        {allTrees.map((tree, key) => {
          return (
            <div
              className="w-[80%] border relative mb-5 bg-background-green-200 hover:bg-background-red-300 hover:bg-opacity-70 ease-in duration-150 rounded-lg shadow-lg"
              key={key}
              onClick={() => handleDeleteClick(tree.id)}
            >
              <div className="flex absolute w-full h-full justify-center opacity-0 hover:opacity-100 duration-200 bg-white bg-opacity-10 text-opacity-30 ease-in-out items-center cursor-pointer text-2xl font-rubik-semibold font-semibold">
                Delete
              </div>
              <div
                className="h-full rounded-lg p-4 cursor-pointer"
                onClick={() => {
                  handleClickTree(tree.id);
                }}
              >
                <div className="flex flex-row justify-between mb-2">
                  <p className="text-white font-semibold text-xl capitalize">
                    {tree.name}
                  </p>
                  <p className="text-white font-semibold text-xl capitalize">
                    Last modified: {formatTimeAgo(tree.lastModified)}
                  </p>
                </div>

                <div className="flex flex-row justify-between mb-2">
                  <div className="flex flex-col justify-start items-start px-3">
                    <p className="text-white font-semibold text-md capitalize my-2">
                      Dictionary: {tree.dictionary.length} elements
                    </p>
                    <p className="text-white font-semibold text-md capitalize">
                      Nodes: {tree.nodes.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteTree;
