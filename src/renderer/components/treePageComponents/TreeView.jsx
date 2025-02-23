import React, { useEffect, useRef } from "react";
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import "vis-network/styles/vis-network.css";

const TreeView = ({ nodesArray, edgesArray, onNodeClick, onEdgeClick  }) => {
  const visContainerRef = useRef(null);
  
  useEffect(() => {
    if (!visContainerRef.current) return;
    if (!nodesArray) return
    
    const levels = calculateLevels(nodesArray, edgesArray);

    const nodes = new DataSet(
      nodesArray.map((node) => ({
        ...node,
        label: node.name,
        shape: "circle",
        font: { 
          size: 17,
          align: "center",
          vadjust: 0,
          color: "#fff", 
          bold: true, 
          face: "Arial",
          strokeWidth: 3, 
          strokeColor: "#333",
        },
        heightConstraint: {
          minimum: 70,
          maximum: 70,
          valign: 'middle',
        },
        widthConstraint: {
          minimum: 70,
          maximum: 70
        },
        scaling: {
          label: true 
        },
        borderWidth: 2,
        color: {
          background: getColorByLevel(levels[node.id] || 0),
          border: "#333",
          highlight: {
            background: "#D2E5FF",
            border: "#2B7CE9",
          },
        },
      }))
    );

    const edges = new DataSet(
      edgesArray.map((edge) => ({
        ...edge,
        label: edge.label || "", // Adiciona um label se existir
        font: {
          size: 14, // Tamanho da fonte do label da aresta
          color: "#333", // Cor escura para melhor visibilidade
          face: "Arial", // Fonte mais legível
          background: "rgba(255, 255, 255, 0.8)", // Fundo branco semi-transparente
          strokeWidth: 2, // Contorno para destacar o texto
          strokeColor: "#fff", // Cor do contorno branco
        },
        width: 2,
        color: {
          color: "#84A98C",
          highlight: "#CAD2C5", 
        },
        arrows: { to: { enabled: false, type: "circle" } },
      } ))
    );

    const options = {
      layout: {
        hierarchical: {
          direction: "LR",
          sortMethod: "directed",
          nodeSpacing: 150,
          levelSeparation: 250,
          shakeTowards: 'roots'
        },
      },
      nodes: {
        borderWidth: 4,
      },
      edges: {
        smooth: true,
        
        color: { color: "#84A98C" },
        width: 2,
        selectionWidth: 3,
      },
      physics: { enabled: true },
    };

    if (visContainerRef.current) {
      const network = new Network(
        visContainerRef.current,
        { nodes, edges },
        options
      );

      // Evento de clique no nó
      network.on("click", function (params) {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const nodeData = nodes.get(nodeId); 
          console.log("No clicado:",nodeData)
          console.log("No clicado (ID)", nodeId)
          onNodeClick(nodeId);
        }

        if (params.edges.length > 0) {
          const edgeId = params.edges[0];
          //console.log(params)
          const edgeData = edges.get(edgeId);
          console.log("Aresta clicada:", edgeData);
          onEdgeClick(edgeData)
        }
      });

      network.stabilize();

      return () => {
        network.destroy();
      };
    }
  }, [nodesArray, edgesArray]);

  return <div ref={visContainerRef} className="w-full h-full"></div>;
};

function getColorByLevel(level) {
  const colors = [
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
    "#955251",
    "#B565A7",
    "#009B77",
  ];
  return colors[level % colors.length];
}

// Função para calcular os níveis dos nós
function calculateLevels(nodes, edges) {
  const levels = {};
  const rootId = nodes[0]?.id || 1;
  levels[rootId] = 0;

  function assignLevel(nodeId, level) {
    levels[nodeId] = level;
    edges
      .filter((edge) => edge.from === nodeId)
      .forEach((edge) => assignLevel(edge.to, level + 1));
  }

  assignLevel(rootId, 0);
  return levels;
}

export default TreeView;
