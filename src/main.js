const { app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu } = require('electron');
const path = require('node:path');
const robot = require('robotjs');
const { reverse } = require('../../src/utils/translate.js');

let tray = null;
let mainWindow = null;
let previousWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreen: true,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });
  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.on('blur', () => {
    if (mainWindow) {
      mainWindow.hide();
    }
  });
};

function createTray() {
  tray = new Tray(path.join(__dirname, './icon-192.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Settings', type: 'normal', click: () => { /* Open settings */ }},
    { label: 'Quit', type: 'normal', click: () => app.quit() }
  ]);
  tray.setToolTip('Electron App');
  tray.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createTray();
  createWindow();

  globalShortcut.register('CommandOrControl+Shift+G', () => {

    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

async function focusBackApp() {
  robot.keyTap('tab', 'alt');
}

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('hide-window', async () => {
  if (mainWindow) {
    mainWindow.hide();
  }

  focusBackApp()

});

ipcMain.on('process-text', async (event, text) => {
  const clipboardy = await import('clipboardy');
  console.log('text:', text)

  const processedText = reverse(text); // Assuming run() is defined or imported
  console.log('processed:', processedText)
  clipboardy.default.writeSync(processedText);
  //focusBackApp()

});


