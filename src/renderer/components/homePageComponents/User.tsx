import React from "react";
import userIcon from "../../../assets/placeholder-userIcon.png";
function UserIcon() {
  return (
    <div className="flex flex-row w-full h-[25%] items-center justify-around p-2">
      <div className="w-2/6 flex-shrink-0 p-1">
        <img src={userIcon} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-3/6">
        <p className="text-md text-white truncate">Eduardo Miyake</p>
      </div>
    </div>
  );
}

export default UserIcon;
