import React, { useEffect, useRef } from "react";
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import "vis-network/styles/vis-network.css";

const TreeView = () => {
  const visContainerRef = useRef(null);

  useEffect(() => {
    const nodesArray = [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ];

    const edgesArray = [
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ];

    const levels = calculateLevels(nodesArray, edgesArray);

    const nodes = new DataSet(
      nodesArray.map((node) => ({
        ...node,
        shape: "circle",
        font: { size: 10 },
        size: 20,
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

    const edges = new DataSet(edgesArray);

    const options = {
      layout: {
        hierarchical: {
          direction: "LR",
          sortMethod: "directed",
          nodeSpacing: 150,
          levelSeparation: 250,
        },
      },
      nodes: {
        heightConstraint: 10,
        borderWidth: 4,
        size: 20,
        scaling: {
          min: 10,
          max: 10,
          label: { enabled: false },
        },
      },
      edges: {
        smooth: true,
        arrows: {
			to: { 
				enabled: false, 
				type: "circle" 
			} 
		},
        color: { color: "#84A98C" },
        width: 2,
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
          alert("Nó clicado: " + params.nodes[0]);
        }
      });

      network.stabilize();
    }
  }, []);

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
