// Browser-compatible storage using localStorage
class BrowserStorage {
  constructor() {
    this.prefix = 'lakiitu_';
  }

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return defaultValue;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to storage:', error);
      return false;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error('Error removing from storage:', error);
      return false;
    }
  }
}

const storage = new BrowserStorage();

// Browser API to replace Electron IPC
export const browserAPI = {
  // Store operations
  getStoreValue: async (key) => storage.get(key),
  setStoreValue: async (key, value) => storage.set(key, value),
  
  // Profile operations
  getAllProfiles: async () => storage.get('profiles', []),
  saveProfile: async (profile) => {
    const profiles = storage.get('profiles', []);
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    
    if (existingIndex >= 0) {
      profiles[existingIndex] = profile;
    } else {
      profiles.push(profile);
    }
    
    storage.set('profiles', profiles);
    return true;
  },
  deleteProfile: async (profileId) => {
    const profiles = storage.get('profiles', []);
    const filtered = profiles.filter(p => p.id !== profileId);
    storage.set('profiles', filtered);
    return true;
  },
  getCurrentProfile: async () => storage.get('currentProfile', null),
  setCurrentProfile: async (profileId) => {
    storage.set('currentProfile', profileId);
    return true;
  },
  
  // Launcher items
  getLauncherItems: async () => storage.get('launcherItems', []),
  saveLauncherItem: async (item) => {
    const items = storage.get('launcherItems', []);
    const existingIndex = items.findIndex(i => i.id === item.id);
    
    if (existingIndex >= 0) {
      items[existingIndex] = item;
    } else {
      items.push(item);
    }
    
    storage.set('launcherItems', items);
    return true;
  },
  deleteLauncherItem: async (itemId) => {
    const items = storage.get('launcherItems', []);
    const filtered = items.filter(i => i.id !== itemId);
    storage.set('launcherItems', filtered);
    return true;
  },
  
  // RetroArch (removed - no longer needed)
  getRetroarchPath: async () => '',
  setRetroarchPath: async () => true,
  selectRetroarchPath: async () => null,
  
  // Game launching - now uses ClassicGameZone.com
  launchGame: async (gameName, platform) => {
    // This is handled directly in the GameLauncher component
    // Games open on classicgamezone.com
    return true;
  },
  
  selectGameFile: async () => {
    // No longer needed - games are launched by name
    return null;
  },
  
  // Window controls (not applicable in browser, but keep for compatibility)
  minimizeWindow: async () => {
    // Browser doesn't support minimizing windows
    console.log('Minimize not available in browser');
  },
  maximizeWindow: async () => {
    // Browser doesn't support maximizing windows
    console.log('Maximize not available in browser');
  },
  closeWindow: async () => {
    // Browser doesn't support closing windows
    console.log('Close not available in browser');
  },
  
  // External links
  openExternal: async (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  },
  
  launchApp: async (appPath) => {
    // Browser can't launch local applications
    alert(`Cannot launch local application from browser: ${appPath}\n\nPlease launch it manually.`);
    return false;
  },
  
  // Setup
  checkFirstTimeSetup: async () => {
    return !storage.get('setupCompleted', false);
  },
  completeSetup: async () => {
    storage.set('setupCompleted', true);
    return true;
  },
};

// Make it available globally for compatibility
if (typeof window !== 'undefined') {
  window.electronAPI = browserAPI;
}

export default browserAPI;

