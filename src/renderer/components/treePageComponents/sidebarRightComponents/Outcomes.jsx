import React from "react";

function Outcomes({ outcomes }) {
  console.log(outcomes)

  if(!outcomes) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No node selected
        </p>
      </div>
    )
  }

  if(Object.keys(outcomes).length === 0) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <p className="text-md font-medium text-white text-center">
                No node selected
            </p>
        </div>
    )
  } else if (outcomes === "No outcome") {
      return (
          <div className="flex flex-col justify-center items-center w-full h-full">
              <p className="text-md font-medium text-white text-center">
                  No outcome for that node
              </p>
          </div>
      )
  }

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-auto">
            <table className='w-full items-center table-auto text-left whitespace-nowrap text-sm h-1/4 rounded-lg'>
                <thead className='uppercase'>
                    <tr className='bg-background-green-300 text-left'>
                        <th scope='col' className='px-4 py-2'>Key</th>
                        <th scope='col' className='px-4 py-2'>Operator</th>
                        <th scope='col' className='px-4 py-2'>Value</th>
                    </tr>
                </thead>
                <tbody className='h-2/6'>
                    {outcomes.map((outcome, index) => {
                        if (outcome === "No predicate") {
                            return (
                                <tr key={index} className={`font-bold text-left ${index % 2 == 0 ? "bg-background-green-400" : "bg-background-green-500"}`}>
                                    <td colSpan="4" className='px-4 py-2 text-left'>
                                        No outcome for this node
                                    </td>
                                </tr>
                            );
                        }

                        return (
                            <tr key={index} className={`font-bold text-left ${index % 2 == 0 ? "bg-background-green-400" : "bg-background-green-500"}`}>
                                <td className='px-4 py-4'>{outcome.key}</td>
                                <td className='px-4 py-4'>{outcome.operator}</td>
                                <td className='px-4 py-4'>{outcome.value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
  );
}

export default Outcomes;
