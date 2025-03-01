import React from "react";

function Actions({ edge, nodes }) {
  console.log(edge);

  if (Object.keys(edge).length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No edge selected
        </p>
      </div>
    );
  } else if (edge[0].actions === "No action" && edge.length == 1) {
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
          {edge.map((edgeInfo, index) => {
            if (edgeInfo.actions === "No actions") {
              return (
                <tr key={index} className="font-bold">
                  <td className="px-4 py-4">
                    {nodes[edgeInfo.from - 1]?.name} -&gt;{" "}
                    {nodes[edgeInfo.to - 1]?.name}
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
                  {nodes[edgeInfo.from - 1]?.name} -&gt;{" "}
                  {nodes[edgeInfo.to - 1]?.name}
                </td>

                <td className="px-4 py-4">{edgeInfo.actions.key}</td>
                <td className="px-4 py-4">{edgeInfo.actions.operator}</td>
                <td className="px-4 py-4">{edgeInfo.actions.value}</td>
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
