import React from "react";

function Actions({ edges, nodes }) {
  let actions = []
  let actionsConnection = []

  if(edges && Array.isArray(edges)) {
    edges.map((edge) => {
      actions.push(edge.actions)
      actionsConnection.push([edge.from, edge.to])
    })
  }

  // tratar valor inicial das actions == {}
  if (Object.keys(actions).length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No edge selected
        </p>
      </div>
    )
  } else if (actions[0] === "No action" && actions.length === 1) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No actions for that node
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto overflow-x-auto w-full">
      <table className="items-center table-auto text-left whitespace-nowrap text-sm h-1/4 rounded-lg">
        <thead className="uppercase">
          <tr className="bg-background-green-300">
            <th scope="col" className="px-4 py-2">
              Edge
            </th>
            <th scope="col" className="px-4 py-2">
              Key
            </th>
            <th scope="col" className="px-4 py-2">
              Operator
            </th>
            <th scope="col" className="px-4 py-2">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-background-green-400 h-2/6">
          {actions.map((action, index) => {
            if (action === "No action") {
              return (
                <tr key={index} className="font-bold">
                  <td className="px-4 py-4">
                    {nodes[actionsConnection[index][0]]?.name} -&gt; {nodes[actionsConnection[index][1]]?.name}
                  </td>
                  <td colSpan="4" className="px-4 py-2 text-left">
                    No actions for this connection
                  </td>
                </tr>
              );
            }
            return (
              <tr key={index} className="font-bold">
                <td className="px-4 py-4">
                  {nodes[actionsConnection[index][0]]?.name} -&gt; {nodes[actionsConnection[index][1]]?.name}
                </td>

                <td className="px-4 py-4">{action.key}</td>
                <td className="px-4 py-4">{action.operator}</td>
                <td className="px-4 py-4">{action.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    // <div className="h-full overflow-y-auto w-full">
    //   {edge.map((action) => {
    //     console.log(action.actions)
    //   })}
    // </div>
  );
}

export default Actions;
