# Web Version - GitHub Pages

This version has been converted from Electron to a web application that can be hosted on GitHub Pages.

## Changes Made

### Removed Electron Dependencies
- Removed `electron`, `electron-builder`, `electron-store`
- Removed `main.js` and `preload.js` (you can delete these files)

### Added Browser Compatibility
- Created `src/utils/storage.js` - Browser API using localStorage
- Switched from `BrowserRouter` to `HashRouter` for GitHub Pages compatibility
- Updated all components to use browser APIs instead of Electron IPC

### Updated Build Configuration
- Simplified `package.json` for web deployment
- Added `gh-pages` for deployment
- Added GitHub Actions workflow for automatic deployment

## Key Differences

### Data Storage
- **Before**: electron-store (file system)
- **Now**: localStorage (browser storage)

### File Selection
- **Before**: Electron dialog with full file paths
- **Now**: Browser file picker (limited to file info)

### Game Launching
- **Before**: Could launch RetroArch directly
- **Now**: Shows instructions (browsers cannot execute local apps)

### Window Controls
- **Before**: Custom window controls
- **Now**: Hidden in browser (browser handles window management)

## Deployment

See `DEPLOY.md` for detailed deployment instructions.

## Notes

- All routes use hash routing (`#/plaza` instead of `/plaza`)
- Data persists in browser localStorage
- Some features are limited by browser security restrictions
- The app is fully functional for profile management and launcher customization

