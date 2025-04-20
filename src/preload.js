const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("treeAPI", {
  createTree: (treeName) => ipcRenderer.invoke("create-tree", treeName),
  saveTree: (treeName, data) => ipcRenderer.invoke("save-tree", treeName, data),
  loadTree: (treeId) => ipcRenderer.invoke("load-tree", treeId),
  getSavedTrees: () => ipcRenderer.invoke("list-tree"),
  exportTree: (treeId) => ipcRenderer.invoke("export-tree", treeId),
  deleteTree: (treeId) => ipcRenderer.invoke("delete-tree", treeId)
});

contextBridge.exposeInMainWorld("cenarioAPI", {
  createNewCenario: (cenarioName, treeId) => ipcRenderer.invoke("create-cenario", cenarioName, treeId),
  saveCenario: (cenarioId, data) => ipcRenderer.invoke("save-cenario", cenarioId, data),
  loadCenario: (cenarioId) => ipcRenderer.invoke("load-cenario", cenarioId),
  getSavedCenarios: () => ipcRenderer.invoke("list-cenario"),
  deleteCenario: (cenarioId) => ipcRenderer.invoke("delete-cenario", cenarioId)
})
