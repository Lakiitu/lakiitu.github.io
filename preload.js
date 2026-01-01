const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Store operations
  getStoreValue: (key) => ipcRenderer.invoke('get-store-value', key),
  setStoreValue: (key, value) => ipcRenderer.invoke('set-store-value', key, value),
  
  // Profile operations
  getAllProfiles: () => ipcRenderer.invoke('get-all-profiles'),
  saveProfile: (profile) => ipcRenderer.invoke('save-profile', profile),
  deleteProfile: (profileId) => ipcRenderer.invoke('delete-profile', profileId),
  getCurrentProfile: () => ipcRenderer.invoke('get-current-profile'),
  setCurrentProfile: (profileId) => ipcRenderer.invoke('set-current-profile', profileId),
  
  // Launcher items
  getLauncherItems: () => ipcRenderer.invoke('get-launcher-items'),
  saveLauncherItem: (item) => ipcRenderer.invoke('save-launcher-item', item),
  deleteLauncherItem: (itemId) => ipcRenderer.invoke('delete-launcher-item', itemId),
  
  // RetroArch
  getRetroarchPath: () => ipcRenderer.invoke('get-retroarch-path'),
  setRetroarchPath: (path) => ipcRenderer.invoke('set-retroarch-path', path),
  selectRetroarchPath: () => ipcRenderer.invoke('select-retroarch-path'),
  launchGame: (gamePath, core) => ipcRenderer.invoke('launch-game', gamePath, core),
  selectGameFile: () => ipcRenderer.invoke('select-game-file'),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // Setup
  checkFirstTimeSetup: () => ipcRenderer.invoke('check-first-time-setup'),
  completeSetup: () => ipcRenderer.invoke('complete-setup'),
  
  // External
  launchApp: (appPath) => ipcRenderer.invoke('launch-app', appPath),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
});

