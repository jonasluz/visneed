import React, { useEffect, useState } from 'react'

function Nodes({ nodes, edges, onNodeClick, onEdgeClick}) {

  const [selectedNode, setSelectedNode] = useState()
  const [selectedEdges, setSelectedEdges] = useState()
  console.log(edges)
  console.log(nodes)

  useEffect(() => {
    onEdgeClick(selectedEdges)
  }, [selectedEdges])

  const handleClick = (nodeInformations) => {
    setSelectedEdges({"from": parseInt(nodeInformations.name.charAt(0)), "to": parseInt(nodeInformations.name.charAt(2)), "actions": nodeInformations.gate.actions.length > 0 ? nodeInformations.gate.actions[0] : "No action", "predicate": nodeInformations.gate.predicates ? nodeInformations.gate.predicates[0] : "No predicates"})
  }



  return (
    <div className="h-full overflow-y-auto scrollbar-none">
      {nodes ? (
        nodes.map((node) => {
        return (
          <p className={`text-white py-3 px-5 my-2 hover:bg-background-green-400 rounded-md cursor-pointer ${selectedNode == node.id && "bg-background-green-400"}`} key={node.id} onClick={() => {onNodeClick(node.id); handleClick(node.connections); setSelectedNode(node.id)}}>
            {node.name}
            {console.log(node.connections)}
          </p>
        )
      })
      ) : (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <p className="text-md font-medium text-white text-center">Nenhuma nó encontrado.</p>
        </div>
      )
      }
    </div>
  )
}

export default Nodes