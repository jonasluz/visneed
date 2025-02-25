import { app, BrowserWindow, screen, Menu, ipcMain } from 'electron';
const path = require("path");
const { createNewTree, saveTreeData, loadTreeData, getSavedTrees } = require("../../scripts/treeManager");

import fs from 'fs';

const DATA_DIR = path.join(__dirname, '../../data');
const JSON_FILE_PATH = path.join(DATA_DIR, 'user_data.json');

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

//Menu.setApplicationMenu(null);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const { width, height } = screen.getPrimaryDisplay().size;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: height,
    width: 1500, 
    minHeight: 698,
    minWidth: 1110,
    center: true,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}`);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

   mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Criar uma nova árvore quando solicitado
ipcMain.handle("create-tree", async (_, treeName) => {
  return createNewTree(treeName);
});

// Salvar os dados da árvore
ipcMain.handle("save-tree", async (_, treeName, data) => {
  saveTreeData(treeName, data);
});

// Carregar os dados da árvore
ipcMain.handle("load-tree", async (_event, treeId) => {
  return loadTreeData(treeId);
});

ipcMain.handle("list-tree", async (_) => {
  return getSavedTrees();
});