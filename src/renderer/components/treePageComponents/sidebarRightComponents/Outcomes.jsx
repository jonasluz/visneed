import React from "react";

function Outcomes({ outcomes }) {
  // console.log(outcomes)

  if(!outcomes) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No node selected
        </p>
      </div>
    )
  }
    
  if (outcomes === "No outcome") {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No outcomes
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto w-full">
      {outcomes.map((outcome, index) => {
        return (
          <p key={index} className="text-white py-3 px-5 my-2 hover:bg-background-green-400 rounded-lg cursor-pointer w-full">
            {outcome.key} {outcome.operator} {outcome.value}
          </p>
        )
        
      })}
    </div>
  );
}

export default Outcomes;
