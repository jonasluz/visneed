const { app } = require("electron");
const fs = require("fs");
const path = require("path");

// Diretório base para armazenar todas as árvores
const treesPath = path.join(app.getPath("userData"), "trees");

// Garante que o diretório das árvores exista
if (!fs.existsSync(treesPath)) {
  fs.mkdirSync(treesPath);
}

// Função para criar uma nova árvore com um nome único
function createNewTree(treeName) {
  const treeId = Date.now(); // Gera um ID único
  const jsonFilePath = path.join(treesPath, `tree_${treeId}.json`);
  const newTree = { id: treeId, name: treeName, dictionary: [], nodes: [] };
  console.log(newTree)

  fs.writeFileSync(jsonFilePath, JSON.stringify(newTree, null, 2), "utf-8");
  return treeId
}

function saveTreeData(treeId, data) {
  console.log("Dados salvos")
  const filePath = path.join(treesPath, `tree_${treeId}.json`);
  console.log(filePath)
  if (fs.existsSync(filePath)) {
    const currentData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log(currentData)
    const updatedData = {
      ...currentData,
      dictionary: data.dictionary,  
      nodes: data.nodes,           
    };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");  }
}

function loadTreeData(treeId) {
  const filePath = path.join(treesPath, `tree_${treeId}.json`);
  console.log(filePath)
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return null
}

function getSavedTrees() {
  if (!fs.existsSync(treesPath)) return [];
  
  const files = fs.readdirSync(treesPath).filter(file => file.startsWith("tree_"));
  return files.map(file => {
    const filePath = path.join(treesPath, file);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });
}

module.exports = { createNewTree, saveTreeData, loadTreeData, getSavedTrees };
