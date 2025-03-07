const { app } = require("electron");
const fs = require("fs");
const path = require("path");

// Diretório base para armazenar todas as árvores (armazena tudo na pasta "trees")
const treesPath = path.join(app.getPath("userData"), "trees");

// Diretorio das arvores existe?
if (!fs.existsSync(treesPath)) {
  fs.mkdirSync(treesPath);
}

//GET (all trees)
function getSavedTrees() {
  if (!fs.existsSync(treesPath)) return [];
  
  const files = fs.readdirSync(treesPath).filter(file => file.startsWith("tree_"));
  return files.map(file => {
    const filePath = path.join(treesPath, file);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });
}

// GET (specific tree data)
function loadTreeData(treeId) {
  const filePath = path.join(treesPath, `tree_${treeId}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return null
}

// POST
function createNewTree(treeName) {
  const treeId = Date.now(); // Gera ID único
  const jsonFilePath = path.join(treesPath, `tree_${treeId}.json`);
  const newTree = { id: treeId, name: treeName, dictionary: [], nodes: [], lastModified: new Date().toISOString()};

  fs.writeFileSync(jsonFilePath, JSON.stringify(newTree, null, 2), "utf-8");
  return treeId
}

// UPDATE
function saveTreeData(treeId, data) {
  const filePath = path.join(treesPath, `tree_${treeId}.json`);
  if (fs.existsSync(filePath)) {
    const currentData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const updatedData = {
      ...currentData,
      dictionary: data.dictionary,  
      nodes: data.nodes,     
      lastModified: new Date().toISOString(),      
    };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");  }
}

//DELETE
function deleteTreeData(treeId) {
  const filePath = path.join(treesPath, `tree_${treeId}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); 
    return true; 
  }
  return false;
}

//EXPORT
function exportTree(treeId) {
  const filePath = path.join(treesPath, `tree_${treeId}.json`);
  if (fs.existsSync(filePath)) {
    const treeData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const exportData = {
      dictionary: treeData.dictionary,
      nodes: treeData.nodes,
    };
    return exportData; // Retorna apenas os campos necessários
  }
  return null;
}


module.exports = { createNewTree, saveTreeData, loadTreeData, getSavedTrees, deleteTreeData, exportTree };