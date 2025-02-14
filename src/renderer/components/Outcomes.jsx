import React from "react";

function Outcomes({ outcomes }) {
  if (outcomes === "No outcome") {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No outcomes
        </p>
      </div>
    );
  }

  console.log(outcomes)
  return (
    <div className="h-full overflow-y-auto">
      {outcomes ? (
        <p className="text-white py-3 px-5 my-2 hover:bg-background-green-400 rounded-lg cursor-pointer">
          {outcomes}
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p className="text-md font-medium text-white text-center">
            No node selected
          </p>
        </div>
      )}
    </div>
  );
}

export default Outcomes;
