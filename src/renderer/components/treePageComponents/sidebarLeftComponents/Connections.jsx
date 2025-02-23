import React from "react";

function Connections({ connections }) {

  return (
    <div className="h-full overflow-y-auto">
      {connections.length > 0 ? (
        connections.map((element, index) => {
        return (
          <p className='text-white py-3 px-5 my-2 hover:bg-background-green-400 rounded-lg cursor-pointer' key={index}>{element.name}</p>
        )
      })
      ) : (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <p className="text-md font-medium text-white text-center">No node selected</p>
        </div>
      )
      }
    </div>
  );
}

export default Connections;
