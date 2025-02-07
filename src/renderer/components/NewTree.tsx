import React from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/add-symbol.png";

function NewTree() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tree-view");
  };
  return (
    <div className="flex h-[25%] items-center">
      <button
        onClick={handleClick}
        className="flex flex-row bg-background-green-300 p-3 rounded-2xl ml-10 items-center"
      >
        <img src={addIcon} alt="" className="object-cover w-4 h-4 mr-2" />
        <p className="text-lg font-semibold">Tree</p>
      </button>
    </div>
  );
}

export default NewTree;
