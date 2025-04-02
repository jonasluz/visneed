import React, { useEffect, useRef, useState } from "react";
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import "vis-network/styles/vis-network.css";

const TreeView = ({ nodesArray, edgesArray, onNodeClick, onEdgeClick, onBackgroundClick, setIsTreeLoading }) => {
  const visContainerRef = useRef(null);

  useEffect(() => {
    if (!nodesArray || nodesArray.length === 0 || !visContainerRef.current) {
      return;
    }

    if (!visContainerRef.current) return;
    if (!nodesArray) return
    
    const levels = calculateLevels(nodesArray, edgesArray);

    const nodes = new DataSet(
      nodesArray.map((node) => {
        const outcomeText = Array.isArray(node.outcomes) ? node.outcomes.map((outcome) => `${outcome.key} ${outcome.operator} ${outcome.value}`).join("\n") : node.outcomes
    
        return {
          ...node,
          label: node.name, 
          title: `Outcome:\n${outcomeText}`, 
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
            hover: {
              background: "#FFD700",
              border: "#FFA500", 
            }
          },
        };
      })
    );

    const edges = new DataSet(
      edgesArray.map((edge) => ({
        ...edge,
        label: edge.predicate == "No predicates" ? "\n\n" : `${edge.predicate.key ? edge.predicate.key : ""} ${edge.predicate.condition ? edge.predicate.condition : ""} ${edge.predicate.value ? edge.predicate.value : ""} \n\n` + (edge.actions == "No action" ? " " : `${edge.actions.key ? edge.actions.key : ""} ${edge.actions.condition ? edge.actions.condition : "" } ${edge.actions.value ? edge.actions.value : ""}`), 
        font: {
          size: 16, 
          color: "#1E1E1E",
          face: "Arial",
          align: 'middle',
          strokeWidth: 2, 
          strokeColor: "#fff", 
        },
        width: 2,
        color: {
          color: "#84A98C",
          highlight: "#CAD2C5", 
          hover: "#FFD700",
        },
        arrows: { to: { enabled: true, type: "arrow" } },
      } ))
    );

    const options = {
      layout: {
        hierarchical: {
          direction: "LR",
          sortMethod: "directed",
          nodeSpacing: 150,
          levelSeparation: 500,
          shakeTowards: 'roots'
        },
      },
      physics: {
        enabled: true, 
        solver: 'forceAtlas2Based',
      },
      edges: {
        smooth: {
          type: 'continuous',
        },
        color: { color: "#84A98C" },
        width: 2,
        selectionWidth: 3,
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: true,
      },
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
          // const nodeData = nodes.get(nodeId);   
          onNodeClick(nodeId);

        } if (params.edges.length > 0) {
          let edgeData = [];
          params.edges.map((element) => {
            edgeData.push(edges.get(element))
          })
          console.log("Aresta clicada:", edgeData);
          onEdgeClick(edgeData)
        } 

        if(!(params.nodes.length > 0) && !(params.edges.length)) {
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

      network.on("stabilizationIterationsDone", function() {
        setIsTreeLoading(false);
      });

      network.stabilize();

      return () => {
        network.off("stabilizationIterationsDone");
        network.destroy();
      };
    }
  }, [nodesArray, edgesArray, setIsTreeLoading]);

  return (
    <div className="w-full h-full relative">
      <div ref={visContainerRef} className="w-full h-full"></div>
    </div>
  );
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
  const visited = new Set(); 

  const assignLevel = (nodeId, level) => {
    if (visited.has(nodeId)) return;

    visited.add(nodeId);
    levels[nodeId] = level;

    const children = edges.filter(edge => edge.from === nodeId).map(edge => edge.to);
    children.forEach(childId => assignLevel(childId, level + 1));
  };

  nodes.forEach((node) => {
    if (!visited.has(node.id)) {
      assignLevel(node.id, 0);
    }
  });

  return levels;
}

export default TreeView;
