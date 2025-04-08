import React from "react";

function Predicates({ edges, nodes, onSelectPredicate, selectedIndex }) {
  console.log(edges);
  let predicates = [];
  let predConnection = [];

  if (edges && Array.isArray(edges)) {
    edges.map((edge, index) => {
      predicates[index] = edge.predicate.map((predicates) => predicates);
      predConnection[index] = [edge.from, edge.to];
    });
  }

  if (Object.keys(predicates).length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No edge selected
        </p>
      </div>
    );
  } else if (predicates[0] === "No predicates" && predicates.length == 1) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-md font-medium text-white text-center">
          No predicate for that node
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-auto">
      <table className="w-full items-center table-auto text-left whitespace-nowrap text-sm h-1/4 rounded-lg">
        <thead className="uppercase sticky top-0">
          <tr className="bg-background-green-300 text-left">
            <th scope="col" className="px-4 py-2">Edge</th>
            <th scope="col" className="px-4 py-2">Key</th>
            <th scope="col" className="px-4 py-2">Condition</th>
            <th scope="col" className="px-4 py-2">Value</th>
            <th scope="col" className="px-4 py-2">Log. Op</th>
          </tr>
        </thead>
        <tbody className="h-2/6">
        {predicates.map((predicate, predIndex) =>
          predicate.map((element, index) => {
            const showConnection = index === 0; 
            const isSelected = selectedIndex === index;

            if (element === "No predicates") {
              return (
                <tr
                  key={`${predIndex}-${index}`}
                  className={`font-bold text-left ${
                    index % 2 === 0
                      ? "bg-background-green-400"
                      : "bg-background-green-500"
                  }`}
                >
                  <td className="px-4 py-4">
                    {nodes.find((node) => node.id == predConnection[predIndex][0])?.name}{" "}-&gt;{" "}{nodes.find((node) => node.id == predConnection[predIndex][1])?.name}
                  </td>
                  <td colSpan="4" className="px-4 py-2 text-left">
                    No predicate for this connection
                  </td>
                </tr>
              );
            }

            return (
              <tr key={`${predIndex}-${index}`} onClick={() => onSelectPredicate(index)} className={`font-bold text-left ${showConnection ? predIndex % 2 === 0 ? "bg-background-green-400" : "bg-background-green-400" : "bg-background-green-400 brightness-90"} hover:brightness-75 cursor-pointer ${isSelected ? 'brightness-75' : ''}`}>
                <td className="px-4 py-4">
                  {showConnection ? 
                    `${nodes.find((node) => node.id == predConnection[predIndex][0])?.name} -> ${nodes.find((node) => node.id == predConnection[predIndex][1])?.name}`
                    : 
                    ""}
                </td>
                <td className="px-4 py-4">{element.key}</td>
                <td className="px-4 py-4">{element.condition}</td>
                <td className="px-4 py-4">{element.value}</td>
                <td className="px-4 py-4">{element.logicalOperator}</td>
              </tr>
            );
          })
        )}
        </tbody>
      </table>
    </div>
  );
}

export default Predicates;
