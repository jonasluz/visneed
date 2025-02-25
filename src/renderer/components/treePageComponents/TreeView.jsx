import React, { useEffect, useRef } from "react";
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import "vis-network/styles/vis-network.css";

const TreeView = ({ nodesArray, edgesArray, onNodeClick, onEdgeClick, onBackgroundClick }) => {
  const visContainerRef = useRef(null);
  
  useEffect(() => {
    if (!visContainerRef.current) return;
    if (!nodesArray) return
    
    const levels = calculateLevels(nodesArray, edgesArray);

    const nodes = new DataSet(
      nodesArray.map((node) => ({
        ...node,
        label: node.name,
        labelHighlightBold: true,
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
        borderWidthSelected: 4,
        color: {
          background: getColorByLevel(levels[node.id] || 0),
          border: "#fff",
          highlight: {
            background: "#CAD2C5",
            border: "#84A98C",
          },
        },
      }))
    );
    console.log(edgesArray)
    const edges = new DataSet(
      edgesArray.map((edge) => ({
        ...edge,
        label: edge.predicate == "No predicate" ? "" : edge.predicate.key + " " + edge.predicate.condition + " " + edge.predicate.value + "\n\n" + edge.actions, // Adiciona um label se existir
        font: {
          size: 16, // Tamanho da fonte do label da aresta
          color: "#1E1E1E", // Cor escura para melhor visibilidade
          face: "Arial", // Fonte mais legível
          align: 'middle',
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
          nodeSpacing: 250,
          levelSeparation: 350,
          shakeTowards: 'roots'
        },
      },
      edges: {
        smooth: {
          type: 'continuous'
        },
        
        color: { color: "#84A98C" },
        width: 2,
        selectionWidth: 3,
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: true
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

        } if (params.edges.length > 0) {
          const edgeId = params.edges[0];
          console.log(params.edges)
          let edgeData = [];
          params.edges.map((element) => {
            edgeData.push(edges.get(element))
          })
          console.log(edgeData)
          console.log("Aresta clicada:", edgeData);
          onEdgeClick(edgeData)
        } else {
          onBackgroundClick()
        }
      });

      network.on("hoverNode", function (params) {
        visContainerRef.current.style.cursor = "pointer"; 
      });

      network.on("hoverEdge", function (params) {
        visContainerRef.current.style.cursor = "pointer"; 
      });

      network.on("blurNode", function (params) {
        visContainerRef.current.style.cursor = "default";
      });

      network.on("blurEdge", function (params) {
        visContainerRef.current.style.cursor = "default";
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
