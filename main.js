const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { spawn } = require('child_process');
const fs = require('fs');

const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1024,
    minHeight: 576,
    frame: false,
    backgroundColor: '#5A9FD4',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('get-store-value', (event, key) => {
  return store.get(key);
});

ipcMain.handle('set-store-value', (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('get-all-profiles', () => {
  return store.get('profiles', []);
});

ipcMain.handle('save-profile', (event, profile) => {
  const profiles = store.get('profiles', []);
  const existingIndex = profiles.findIndex(p => p.id === profile.id);
  
  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  
  store.set('profiles', profiles);
  return true;
});

ipcMain.handle('delete-profile', (event, profileId) => {
  const profiles = store.get('profiles', []);
  const filtered = profiles.filter(p => p.id !== profileId);
  store.set('profiles', filtered);
  return true;
});

ipcMain.handle('get-current-profile', () => {
  return store.get('currentProfile', null);
});

ipcMain.handle('set-current-profile', (event, profileId) => {
  store.set('currentProfile', profileId);
  return true;
});

ipcMain.handle('get-launcher-items', () => {
  return store.get('launcherItems', []);
});

ipcMain.handle('save-launcher-item', (event, item) => {
  const items = store.get('launcherItems', []);
  const existingIndex = items.findIndex(i => i.id === item.id);
  
  if (existingIndex >= 0) {
    items[existingIndex] = item;
  } else {
    items.push(item);
  }
  
  store.set('launcherItems', items);
  return true;
});

ipcMain.handle('delete-launcher-item', (event, itemId) => {
  const items = store.get('launcherItems', []);
  const filtered = items.filter(i => i.id !== itemId);
  store.set('launcherItems', filtered);
  return true;
});

ipcMain.handle('get-retroarch-path', () => {
  return store.get('retroarchPath', '');
});

ipcMain.handle('set-retroarch-path', (event, path) => {
  store.set('retroarchPath', path);
  return true;
});

ipcMain.handle('select-retroarch-path', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Executables', extensions: ['exe', 'app', 'AppImage'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    store.set('retroarchPath', result.filePaths[0]);
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('launch-game', async (event, gamePath, core) => {
  const retroarchPath = store.get('retroarchPath', '');
  
  if (!retroarchPath || !fs.existsSync(retroarchPath)) {
    throw new Error('RetroArch path not configured or invalid');
  }
  
  if (!gamePath || !fs.existsSync(gamePath)) {
    throw new Error('Game file not found');
  }
  
  const args = ['-L', core, gamePath];
  
  return new Promise((resolve, reject) => {
    const retroarch = spawn(retroarchPath, args, {
      detached: true,
      stdio: 'ignore'
    });
    
    retroarch.unref();
    
    retroarch.on('error', (error) => {
      reject(error);
    });
    
    retroarch.on('spawn', () => {
      resolve(true);
    });
  });
});

ipcMain.handle('select-game-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Game Files', extensions: ['nes', 'snes', 'gb', 'gbc', 'gba', 'n64', 'psx', 'iso', 'bin', 'cue'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('close-window', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('check-first-time-setup', () => {
  return !store.get('setupCompleted', false);
});

ipcMain.handle('complete-setup', () => {
  store.set('setupCompleted', true);
  return true;
});

ipcMain.handle('launch-app', (event, appPath) => {
  const { spawn } = require('child_process');
  const app = spawn(appPath, [], { detached: true, stdio: 'ignore' });
  app.unref();
  return true;
});

ipcMain.handle('open-external', (event, url) => {
  const { shell } = require('electron');
  shell.openExternal(url);
  return true;
});

