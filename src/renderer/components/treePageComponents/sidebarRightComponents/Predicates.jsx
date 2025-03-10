import React from 'react'

function Predicates({ edges, nodes }) {
    console.log(edges)
    console.log(nodes)
    let predicates = []
    let predConnection = []

    if(edges && Array.isArray(edges)) {
        edges.map((edge) => {
          predicates.push(edge.predicate)
          predConnection.push([edge.from, edge.to])
        })
    }
    console.log(predConnection)

    if(Object.keys(predicates).length === 0) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <p className="text-md font-medium text-white text-center">
                    No edge selected
                </p>
            </div>
        )
    } else if (predicates[0] === "No predicate" && predicates.length == 1) {
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
            <table className='items-center table-auto text-left whitespace-nowrap text-sm h-1/4 rounded-lg'>
                <thead className='uppercase'>
                    <tr className='bg-background-green-300'>
                        <th scope='col' className='px-4 py-2'>Edge</th>
                        <th scope='col' className='px-4 py-2'>Key</th>
                        <th scope='col' className='px-4 py-2'>Condition</th>
                        <th scope='col' className='px-4 py-2'>Value</th>
                        <th scope='col' className='px-4 py-2'>Log. Op</th>
                    </tr>
                </thead>
                <tbody className='bg-background-green-400 h-2/6'>
                    {predicates.map((predicate, index) => {
                        if (predicate === "No predicate") {
                            return (
                                <tr key={index} className='font-bold'>
                                    <td className='px-4 py-4'>
                                        {nodes.map((node) => {if(node.id == predConnection[index][0]) return node.name})} -&gt; {nodes.map((node) => {if(node.id == predConnection[index][1]) return node.name})}
                                    </td>
                                    <td colSpan="4" className='px-4 py-2 text-left'>
                                        No predicate for this connection
                                    </td>
                                </tr>
                            );
                        }

                        return (
                            <tr key={index} className='font-bold'>
                                <td className='px-4 py-4'>
                                    {nodes.map((node) => {if(node.id == predConnection[index][0]) return node.name})} -&gt; {nodes.map((node) => {if(node.id == predConnection[index][1]) return node.name})}
                                </td>

                                <td className='px-4 py-4'>{predicate.key}</td>
                                <td className='px-4 py-4'>{predicate.condition}</td>
                                <td className='px-4 py-4'>{predicate.value}</td>
                                <td className='px-4 py-4'>{predicate.logicalOperator}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Predicates