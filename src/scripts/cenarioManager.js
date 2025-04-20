const { app } = require("electron");
const fs = require("fs");
const path = require("path");

// Diretório base para armazenar todas as árvores (armazena tudo na pasta "cenarios")
const cenariosPath = path.join(app.getPath("userData"), "cenarios");

if (!fs.existsSync(cenariosPath)) {
  fs.mkdirSync(cenariosPath);
}

//GET (all cenarios)
function getSavedCenarios() {
  if (!fs.existsSync(cenariosPath)) return [];
  
  const files = fs.readdirSync(cenariosPath).filter(file => file.startsWith("cenario_"));
  return files.map(file => {
    const filePath = path.join(cenariosPath, file);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });
}

// GET (specific cenario data)
function loadCenarioData(cenarioId) {
  const filePath = path.join(cenariosPath, `cenario_${cenarioId}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return null
}

// POST
function createNewCenario(cenarioName, treeId) {
  const cenarioId = Date.now();
  const jsonFilePath = path.join(cenariosPath, `cenario_${cenarioId}.json`);
  const newCenario = { 
    id: cenarioId, 
    name: cenarioName, 
    treeId: treeId,
    cenario: {} 
  };

  fs.writeFileSync(jsonFilePath, JSON.stringify(newCenario, null, 2), "utf-8");
  return cenarioId;
}


// UPDATE
function saveCenarioData(cenarioId, data) {
  const filePath = path.join(cenariosPath, `cenario_${cenarioId}.json`);
  if (fs.existsSync(filePath)) {
    const currentData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const updatedData = {
      ...currentData,
      cenario: data.cenario,        
    };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");  }
}

//DELETE
function deleteCenarioData(cenarioId) {
  const filePath = path.join(cenariosPath, `cenario_${cenarioId}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); 
    return true; 
  }
  return false;
}

module.exports = { createNewCenario, saveCenarioData, loadCenarioData, getSavedCenarios, deleteCenarioData };