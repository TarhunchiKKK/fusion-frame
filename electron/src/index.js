const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) { 
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1620,
    height: 1020,
    webPreferences: {
      preload: path.join(__dirname, 'prload.js'),
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('http://localhost:3000');
  //mainWindow.loadFile(path.join(__dirname, 'index.html'));


  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

