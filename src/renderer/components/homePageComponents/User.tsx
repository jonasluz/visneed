import React from "react";
import userIcon from "../../../assets/placeholder-userIcon.png";
function UserIcon() {
  return (
    <div className="items-center justify-around p-4 bottom-0 absolute">
      <div>
        <img src={userIcon} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default UserIcon;
