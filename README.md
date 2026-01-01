# Lakiitu Emulator

A beautiful web-based emulator launcher with a Wii U Miiverse Plaza-inspired UI. Launch retro games directly in your browser - no installation required!

## 🌐 Live Demo

Visit the app on GitHub Pages: `https://YOUR_USERNAME.github.io/lakiitu-emulator`

## ✨ Features

- 🎮 **Browser-Based Gaming** - Launch games on ClassicGameZone.com - no downloads needed!
- 👤 **Profiles & Accounts** - Create and manage multiple user profiles
- 🎨 **Wii U Miiverse Plaza UI** - Beautiful, nostalgic interface design
- 📱 **Customizable Launcher** - Add websites, applications, and internal routes
- ⚙️ **First-Time Setup** - Simple profile creation wizard
- 🎯 **Recent Games** - Quick access to recently played games
- 💾 **Local Storage** - All data saved in your browser
- 🚀 **Zero Installation** - Everything runs in your browser!

## 🎮 How It Works

1. **Enter Game Name** - Type the name of the game you want to play
2. **Select Platform** - Choose the console (SNES, NES, Game Boy, etc.)
3. **Launch** - Click "Launch Game" to open it on ClassicGameZone.com
4. **Play** - Games open in a new tab or embedded frame - no installation needed!

## 🚀 Quick Start

### For Users

Just visit the GitHub Pages URL - no installation required! Everything runs in your browser.

### For Developers

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Locally**
   ```bash
   npm start
   ```
   Opens at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Deployment to GitHub Pages

### Method 1: Automatic (GitHub Actions)

1. Push your code to GitHub
2. The workflow automatically deploys when you push to `main`
3. Go to repository Settings > Pages
4. Select "GitHub Actions" as the source
5. Your site will be available at `https://YOUR_USERNAME.github.io/lakiitu-emulator`

### Method 2: Manual

1. Update `package.json` homepage:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/lakiitu-emulator"
   ```

2. Deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## 🎯 Supported Platforms

- SNES (Super Nintendo)
- NES (Nintendo Entertainment System)
- Game Boy / Game Boy Color
- Game Boy Advance
- Nintendo 64
- PlayStation
- Sega Genesis
- Arcade

## 📁 Project Structure

```
lakiitu-emulator/
├── package.json         # Dependencies and scripts
├── public/              # Static files
│   └── index.html
└── src/                 # React application
    ├── index.js         # React entry point
    ├── App.js           # Main app component
    ├── utils/
    │   └── storage.js   # Browser storage API
    └── components/      # React components
        ├── Plaza.js            # Main plaza/home screen
        ├── FirstTimeSetup.js   # Setup wizard
        ├── ProfileManager.js    # Profile management
        ├── GameLauncher.js     # Game launching interface
        ├── LauncherCustomizer.js # Launcher customization
        ├── Settings.js          # Settings page
        └── WindowControls.js    # Window controls (hidden in browser)
```

## 🛠️ Technologies Used

- **React** - UI library
- **React Router** - Navigation (HashRouter for GitHub Pages)
- **localStorage** - Data persistence
- **CSS3** - Modern styling
- **ClassicGameZone.com** - Game hosting platform

## 📝 Usage

### First Time Setup

1. Create your profile with a name and avatar
2. Start launching games!

### Launching Games

1. Go to "Games" from the Plaza
2. Enter the game name (e.g., "Super Mario World")
3. Select the platform
4. Click "Launch Game"
5. Game opens on ClassicGameZone.com

### Managing Profiles

1. Go to "Profiles" from the Plaza
2. Create, edit, or switch between profiles

### Customizing Launcher

1. Go to "Launcher" from the Plaza
2. Add custom items (websites, apps, routes)

## ⚠️ Important Notes

- **No Installation Required** - Everything runs in your browser
- **Data Storage** - All data is saved in browser localStorage
- **Hash Routing** - Uses hash routing (`#/plaza`) for GitHub Pages compatibility
- **Game Hosting** - Games are hosted on ClassicGameZone.com
- **Privacy** - All data stays in your browser - nothing is sent to servers

## 📄 License

This project is provided as-is for personal use.

## 🙏 Credits

- Games powered by [ClassicGameZone.com](https://classicgamezone.com)
- UI inspired by Wii U Miiverse Plaza

---

**Enjoy retro gaming in your browser! 🎮**
