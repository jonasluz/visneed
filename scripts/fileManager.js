const { app } = require("electron");
const fs = require("fs");
const path = require("path");

// Obtém o caminho da pasta de dados dentro do diretório do aplicativo
const dataPath = path.join(app.getPath("userData"), "data");
const jsonFilePath = path.join(dataPath, "treeData.json");

// Garante que a pasta de dados exista
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

// Função para salvar JSON
function saveJsonData(data) {
  console.log("Arvore salva")
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf-8");
}

// Função para carregar JSON
function loadJsonData() {
  console.log(jsonFilePath)
  if (fs.existsSync(jsonFilePath)) {
    return JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  }
  return null;
}

module.exports = { saveJsonData, loadJsonData };
