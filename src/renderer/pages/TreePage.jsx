import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//components e telas
import TreeSidebarLeft from "../components/treePageComponents/TreeSidebarLeft";
import TreeSideBarRight from "../components/treePageComponents/TreeSideBarRight";
import TreeView from "../components/treePageComponents/TreeView";
import NodeActions from "../components/treePageComponents/NodeActions";
import Dock from "../components/Dock";
//icones
import treeImage from "../../assets/decision-tree-image.png";
import minimizeImage from "../../assets/minimize.png";
import maximizeImage from "../../assets/maximize.png";
//notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoToHomeModal from "../components/treePageComponents/Modals/GoToHomeModal";

function TreePage() {
  const navigate = useNavigate();
  const [showHomeModal, setShowHomeModal] = useState(false);

  const { treeId } = useParams();
  const [tree, setTree] = useState({});
  const [minimized, setMinimized] = useState(true);

  const [selectedNode, setSelectedNode] = useState({});
  const [selectedConnections, setSelectedConnections] = useState({});
  const [selectedOutcome, setSelectedOutcome] = useState([]);
  const [selectedPredicates, setSelectedPredicates] = useState({});

  const [projectName, setProjectName] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    // console.log(selectedNode);
    console.log(tree)
    // console.log(selectedPredicates)
  }, [selectedNode, selectedPredicates]);

  const handleConfirmGoHome = () => {
    setShowHomeModal(false);
    navigate("/");
  };

  // When clicked on a node
  const handleNodeClick = (nodeId) => {
    tree.nodesArray.map((node) => {
      if(node.id === nodeId) {
        setSelectedNode(node);
        setSelectedOutcome(node?.outcomes)
      } 
    })

    const connectedNodes = tree.edgesArray
      .filter((edge) => edge.from === nodeId || edge.to === nodeId)
      .map((edge) => {
        const targetNodeId = edge.from === nodeId ? edge.to : edge.from;
        const targetNode = tree.nodesArray.find(
          (node) => node.id === targetNodeId
        );
        return targetNode
          ? {
              id: targetNode.id,
              name: targetNode.name,
              outcome: targetNode.outcome,
            }
          : null;
      })
      .filter(Boolean);

    setSelectedConnections(connectedNodes);
  };

  // When clicked on a edge
  const handleEdgeClick = (edgeData) => {
    setSelectedPredicates(edgeData);
  };

  // When clicked out of a node or edge
  const handleBakcgroundClick = () => {
    setSelectedPredicates({});
    setSelectedConnections({});
    setSelectedNode({});
    setSelectedOutcome();
    console.log("clicked on background");
  };

  // Import a json to the tree view
  const handleImport = (data) => {
    setTree({
      nodesArray: data.nodesArray,
      edgesArray: data.edgesArray,
      dictionary: data.dictionary,
    });
    
    setProjectName(data.projectName);
  };

  // Minimize or maximize the SideBars
  const handleMinimized = () => {
    setMinimized(!minimized);
  };

  // Add a new node
  const handleAddNode = (
    parentNodeId,
    newNodeName,
    predicateInfo,
    outcomeInfo,
    actionInfo
  ) => {
    if (!parentNodeId) {
      toast.success(`New tree created with root ${newNodeName}`);
    } else {
      toast.success(`Nó ${newNodeName}, criado com sucesso!`);
    }

    const lastNodeOnArray = tree.nodesArray[tree.nodesArray.length - 1];
    const newNodeId = lastNodeOnArray ? lastNodeOnArray.id  + 1 : 1;

    const newNode = {
      id: newNodeId,
      name: newNodeName,
      connections: [],
      outcomes:
        outcomeInfo.key == ""
          ? ["No outcome"]
          : [
              {
                key: outcomeInfo.key,
                operator: outcomeInfo.operator,
                value: outcomeInfo.value,
              },
            ],
    };
    console.log(newNode);

    // Criar a nova conexão para o nó pai
    const newConnection = {
      name: `${parentNodeId}-${newNodeId}`, // Nome da conexão (ex: "1-2")
      targetId: newNodeId,
      gate: {
        predicates:
          predicateInfo.key == ""
            ? "No predicates"
            : [
                {
                  key: predicateInfo.key,
                  condition: predicateInfo.condition,
                  value: predicateInfo.value,
                  logicalOperator: predicateInfo.logicalOperator,
                },
              ],
        actions:
          actionInfo.key == ""
            ? ["No action"]
            : [
                {
                  key: actionInfo.key,
                  operator: actionInfo.operator,
                  value: actionInfo.value,
                },
              ],
      },
    };

    const updatedNodesArray = tree.nodesArray.map((node) => {
      if (node.id === parseInt(parentNodeId)) {
        return {
          ...node,
          connections: [...node.connections, newConnection], // Adiciona a nova conexão
        };
      }
      return node;
    });

    updatedNodesArray.push(newNode);

    const newEdge = {
      from: parseInt(parentNodeId),
      to: newNodeId,
      predicate:
        predicateInfo.key == "" ? "No predicates" : [
              {
                key: predicateInfo.key,
                condition: predicateInfo.condition,
                value: predicateInfo.value,
                logicalOperator: predicateInfo.logicalOperator,
              },
            ],
      actions:
        actionInfo.key == "" ? ["No action"] : [
              {
                key: actionInfo.key,
                operator: actionInfo.operator,
                value: actionInfo.value,
              },
            ],
    };

    console.log(newEdge);

    const updatedEdgesArray = [...tree.edgesArray, newEdge];
    let updatedDictionary = [...tree.dictionary];
  
    if (newNodeName) {
      updatedDictionary.push({ key: newNodeName, type: "string" });
    }
    
    if (outcomeInfo.key) {
      updatedDictionary.push({ key: outcomeInfo.key, type: outcomeInfo.type });
    }
    
    if (predicateInfo.key) {
      updatedDictionary.push({ key: predicateInfo.key, type: predicateInfo.type });
    }
    
    if (actionInfo.key) {
      updatedDictionary.push({ key: actionInfo.key, type: actionInfo.type });
    }

    setTree({
      nodesArray: updatedNodesArray,
      edgesArray: updatedEdgesArray,
      dictionary: updatedDictionary,
    });

    // update json with new node
    const updatedData = {
      nodes: updatedNodesArray.map((node) => ({
        ...node,
        name: node.name,
      })),
      edges: updatedEdgesArray,
      dictionary: updatedDictionary,
      projectName: projectName,
    };

    window.treeAPI.saveTree(treeId, updatedData);
    setUpdate(true);
  };

  //Delete node
  const handleDeleteNode = (nodeId, type) => {
    //Get the node to delete 
    const nodeToDelete = tree.nodesArray.find((node) => node.id === nodeId);
    if (!nodeToDelete) return;

    // Get the parent of the node to be deleted
    const parentEdge = tree.edgesArray.find((edge) => edge.to === nodeId);
    const parentNodeId = parentEdge ? parentEdge.from : null;

    // Encontrar os filhos do nó a ser deletado
    let childrenEdges = [];
    let childrenNodes = [];
    tree.edgesArray.map((edge) => {
      if(edge.from === nodeId) {
        childrenEdges.push(edge)
      }
    });

    childrenEdges.map((edge) => {
      tree.nodesArray.map((node) => {
        if(node.id === edge.to) {
          childrenNodes.push(node)
        }
      })
    });
    
    let substitute = null;

    if(childrenNodes.length > 0 && type === "substitute") {
      console.log(type)
      const firstChild = childrenNodes[0];
      substitute = firstChild.id;

      //  Muda o no pai para apontar para o no substituto
      if (substitute) {
        tree.edgesArray.map((edge) => {
          if(edge.to === nodeId) {
            edge.to = substitute
          }
        });   
      }

      // Muda as conexoes do no pai para o substituto
      tree.nodesArray.map((node) => {
        if(node.id == parentNodeId) {
          node.connections.map((connection) => {
            if(connection.targetId == nodeToDelete.id) {
              console.log(connection)

              connection.targetId = substitute
              connection.name = node.id + '-' + substitute
              connection.actions = ["No action"]
              connection.gate.predicates = "No predicates"
            }
          })
        }
      })

      console.log(tree.nodesArray)

      // Atualizar os filhos restantes para serem filhos do primeiro filho
      const updatedChildrenEdges = childrenEdges.map((edge) =>
        edge.to !== substitute ? { ...edge, from: substitute } : edge
      );

      console.log("depois childrens: ", updatedChildrenEdges)

      updatedChildrenEdges.forEach((edge) => {
        let newConnection = {name: substitute + '-' + edge.to, targetId: edge.to, gate: {predicates: "No predicates"}, actions: ["No action"] }
        tree.edgesArray.push(edge)
        if(edge.from == substitute) {
          tree.nodesArray.map((node) => {
            if(node.id == substitute) {
              node.connections.push(newConnection)
            }
          })
        }
      })
    }

    // Remover o nó da árvore
    tree.nodesArray = tree.nodesArray.filter((node) => node.id !== nodeId);
    tree.edgesArray = tree.edgesArray.filter(
      (edge) => edge.from !== nodeId && edge.to !== nodeId
    );

    console.log(tree.nodesArray)
    console.log(tree.edgesArray)

    tree.dictionary = tree.dictionary.filter((item) => {
      const isNodeName = item.key === nodeToDelete.name;
      const isNodeOutcome = nodeToDelete.outcomes !== "No outcome" && 
                          item.key === nodeToDelete.outcomes[0].key;
      
      return !isNodeName && !isNodeOutcome;
    });

    setTree({
      ...tree,
      nodesArray: [...tree.nodesArray],
      edgesArray: [...tree.edgesArray],
      dictionary: [...tree.dictionary],
    });

    console.log(tree)

    toast.success(`Nó ${nodeToDelete.name} deletado com sucesso!`);

    // Atualizar o JSON salvo no Electron
    const updatedData = {
      nodes: tree.nodesArray,
      edges: tree.edgesArray,
      dictionary: tree.dictionary,
      projectName: projectName,
    };

    console.log("Removendo o no: " + nodeId + " e substituindo por: " + substitute + " que sera filho de: " + parentNodeId + ". filhos do no antigo que eram: " + childrenNodes + " serao filhos agora do novo no.")

    window.treeAPI.saveTree(treeId, updatedData);
    setUpdate(true);
  };

  //Edit node
  const handleUpdateNode = (updatedNode) => {
    const finalNode = {
      ...updatedNode,
      outcomes: updatedNode.outcomes[0] === "No outcome" || 
               (updatedNode.outcomes[0]?.key === "" && 
                updatedNode.outcomes[0]?.operator === "" && 
                updatedNode.outcomes[0]?.value === "")
        ? selectedNode.outcomes
        : updatedNode.outcomes
    };
  
    const originalNode = tree.nodesArray.find(node => node.id === finalNode.id);
  
    let updatedDictionary = [...tree.dictionary];
    
    if (originalNode.name !== finalNode.name) {
      updatedDictionary = updatedDictionary.filter(item => item.key !== originalNode.name);
      if (finalNode.name) {
        updatedDictionary.push({ key: finalNode.name, type: "string" });
      }
    }
  
    const originalOutcome = originalNode.outcomes[0] !== "No outcome" ? originalNode.outcomes[0] : null;
    const newOutcome = finalNode.outcomes[0] !== "No outcome" ? finalNode.outcomes[0] : null;
  
    if (originalOutcome?.key !== newOutcome?.key) {
      if (originalOutcome?.key) {
        updatedDictionary = updatedDictionary.filter(item => item.key !== originalOutcome.key);
      }
      if (newOutcome?.key) {
        updatedDictionary.push({ key: newOutcome.key, type: "number" });
      }
    }
  
    const updatedNodesArray = tree.nodesArray.map(node => 
      node.id === finalNode.id ? finalNode : node
    );
  
    setTree({
      nodesArray: updatedNodesArray,
      edgesArray: tree.edgesArray,
      dictionary: updatedDictionary,
    });
  
    const updatedData = {
      nodes: updatedNodesArray,
      edges: tree.edgesArray,
      dictionary: updatedDictionary,
      projectName: projectName,
    };
  
    window.treeAPI.saveTree(treeId, updatedData);
    setUpdate(true);
    toast.success(`Node ${finalNode.name} updated successfully!`);
  };

  return (
    <div className="relative w-full h-screen bg-background-black-100">
      <Dock
        currentPage={"treePage"}
        treeId={treeId}
        treeName={projectName}
        onHomeClick={() => setShowHomeModal(true)} />

      {/* Modal to go back to Home Page */}
      {showHomeModal && (
        <GoToHomeModal
          onConfirm={handleConfirmGoHome}
          onCancel={() => setShowHomeModal(false)}/>
      )}

      {/* Notification component */}
      <ToastContainer />

      {/* Tree View */}
      <div className="w-full h-full flex justify-center items-center ">
        <TreeView
          nodesArray={tree.nodesArray}
          edgesArray={tree.edgesArray}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          onBackgroundClick={handleBakcgroundClick} />
      </div>

      {/* Left Side Bar */}
      <div className={`absolute top-0 left-0 w-[16%] h-full z-10 ${minimized ? "visible" : "hidden"}`}>
        <TreeSidebarLeft
          treeId={treeId}
          onImport={handleImport}
          nodes={tree.nodesArray}
          selectedConnections={selectedConnections}
          changedTree={update} />
      </div>

      {/* Tree Project Name */}
      <div className={`flex flex-col absolute top-0 w-[54%] ${minimized ? "left-[16%]" : "left-0 w-full"}`}>
        <div className="flex flex-row p-4 text-white items-center justify-between w-full">
          <div className="flex flex-row items-center">
            <img src={treeImage} alt="" className="w-8 h-8 object-cover invert" />
            <p className="ml-2 font-semibold">{projectName}</p>
          </div>
          
          <div className="flex flex-row px-4 py-1 text-sm text-neutral-200">
            <p className="ml-2 font-semibold">Current Node: </p>
            <p className="ml-2 font-semibold text-background-green-400">{selectedNode.name}</p>
          </div>

          <div className="flex flex-row px-4 py-1 text-sm text-neutral-200">
            <p className="ml-2 font-semibold">Current connections: </p>
            <p className="ml-2 font-semibold text-background-green-400">{selectedConnections.length}</p>
          </div>
        </div>
      </div>

      {/* Node Selected */}
      <div className={`absolute bottom-0 p-2 text-white items-center ${minimized ? "left-[16%]" : "left-5"}`}>
        <NodeActions
          nodes={tree.nodesArray}
          edges={selectedPredicates}
          onAddNode={handleAddNode}
          onDeleteNode={handleDeleteNode}
          onUpdateNode={handleUpdateNode}
          nodeSelected={selectedNode}
           />
      </div>

      <div className={`absolute bottom-0 p-2 text-white items-center ${minimized ? "right-[30%]" : "right-5"}`}>
        <button
          className="bg-background-green-400 w-9 h-9 p-2 rounded-lg hover:brightness-50 ease-in-out duration-200"
          onClick={handleMinimized}
        >
          {minimized ? (
            <img src={minimizeImage} alt="" />
          ) : (
            <img src={maximizeImage} alt="" />
          )}
        </button>
      </div>

      {/* Right Side Bar */}    
      <div className={`absolute top-0 right-0 w-[30%] h-full z-10 p-4 overflow-y-auto scrollbar-none ${minimized ? "visible" : "hidden"}`}>
        <TreeSideBarRight
          selectedOutcome={selectedOutcome}
          selectedEdge={selectedPredicates}
          nodes={tree.nodesArray}
          treeId={treeId}
          treeName={projectName} />
      </div>
    </div>
  );
}

export default TreePage;
