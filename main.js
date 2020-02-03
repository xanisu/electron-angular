const {app, BrowserWindow, ipcMain} = require('electron')

const url = require("url");
const path = require("path");

let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true
    }
})

mainWindow.loadURL(
    url.format({
        pathname: path.join(__dirname, `/dist/index.html`), //aquí es donde se compila el proyecto de angular, se define en angular.json
        protocol: "file:",
        slashes: true
    })
);
// Open the DevTools.
mainWindow.webContents.openDevTools()

mainWindow.on('closed', function () {
    mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
      if (mainWindow === null) createWindow()
})


let openModalWindow = function() {
    const { BrowserWindow } = require('electron');
    let modal = new BrowserWindow({ parent:mainWindow, modal:true, show:false })
    modal.loadURL('https://www.sitepoint.com');
    modal.once('ready-to-show', () => {
        modal.show();
    })
}
ipcMain.on('openModal', (event, arg) => {
    openModalWindow()
})