# Building Lakiitu Emulator

## Prerequisites

- Node.js v16 or higher
- npm or yarn

## Development

Run the app in development mode:

```bash
npm install
npm run dev
```

This will:
1. Start the React development server
2. Launch Electron when the server is ready

## Building Executables

### All Platforms

```bash
npm run build:electron
```

This creates platform-specific installers in the `dist/` folder.

### Windows

Creates an `.exe` installer using NSIS.

### macOS

Creates a `.dmg` file.

### Linux

Creates an `.AppImage` file.

## Adding Icons (Optional)

To add custom icons for your executable:

1. **Windows**: Create `assets/icon.ico` (256x256 recommended)
2. **macOS**: Create `assets/icon.icns` (512x512 recommended)
3. **Linux**: Create `assets/icon.png` (512x512 recommended)

Then update `package.json` build configuration to reference these files.

## Troubleshooting

- If build fails, ensure all dependencies are installed: `npm install`
- For Windows builds, you may need to install NSIS
- For macOS builds, you may need to code sign the app for distribution

