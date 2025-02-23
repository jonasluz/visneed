import React from 'react'

function Predicates({ predicates, nodes }) {
    if(Object.keys(predicates).length === 0) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <p className="text-md font-medium text-white text-center">
                    No edge selected
                </p>
            </div>
        )
    } else if (predicates.predicate === "No predicate") {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <p className="text-md font-medium text-white text-center">
                    No predicate for that node
                </p>
            </div>
        )
    }

      return (
        <div className="h-full overflow-y-auto overflow-x-auto w-full">
          <table className='items-center table-auto text-left whitespace-nowrap text-sm h-full rounded-lg'>
            <thead className='uppercase'>
                <tr className='bg-background-green-300'>
                    <th scope='col' className='px-4 py-2'>Edge</th>
                    <th scope='col' className='px-4 py-2'>Key</th>
                    <th scope='col' className='px-4 py-2'>Condition</th>
                    <th scope='col' className='px-4 py-2'>Value</th>
                    <th scope='col' className='px-4 py-2'>Log. Op</th>
                </tr>
            </thead>
            <tbody className='bg-background-green-400'>
                <tr className='font-bold '>
                    <td className='px-4 py-2'>{nodes[predicates.from - 1].name} - {nodes[predicates.to - 1].name}</td>
                    <td className='px-4 py-2'>{predicates.predicate.key}</td>
                    <td className='px-4 py-2'>{predicates.predicate.condition}</td>
                    <td className='px-4 py-2'>{predicates.predicate.value}</td>
                    <td className='px-4 py-2'>{predicates.predicate.logicalOperator}</td>
                </tr>
            </tbody>
          </table>
        
        </div>
      );
}

export default Predicates