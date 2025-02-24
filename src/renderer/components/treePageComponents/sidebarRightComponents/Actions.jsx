import React from 'react'

function Actions({actions}) {
  // console.log(actions)

  if(Object.keys(actions).length === 0) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <p className="text-md font-medium text-white text-center">
                No edge selected
            </p>
        </div>
    )
} else if (actions.actions === "No action") {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <p className="text-md font-medium text-white text-center">
                No actions for that node
            </p>
        </div>
    )
}

  return (
    <div className="h-full overflow-y-auto w-full">
      {actions.actions ? (
        <p className="text-white py-3 px-5 my-2 hover:bg-background-green-400 rounded-lg cursor-pointer w-full">
          {actions.actions}
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p className="text-md font-medium text-white text-center">
            No edge selected
          </p>
        </div>
      )}
    </div>
  )
}

export default Actions