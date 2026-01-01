# Quick Start Guide

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run in Development Mode**
   ```bash
   npm start
   ```
   This will start the React development server at `http://localhost:3000`

3. **First Launch**
   - Open the app in your browser
   - You'll see the first-time setup wizard
   - Create your profile (name and avatar)
   - Optionally configure RetroArch path (for reference only)

4. **Using the App**
   - **Plaza**: Main home screen with all your launcher items
   - **Games**: Manage and view your game collection
   - **Profiles**: Manage user profiles
   - **Launcher**: Customize launcher items (websites, apps, routes)
   - **Settings**: Configure app settings

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized build will be in the `build/` folder.

## Deploying to GitHub Pages

### Update Homepage

Edit `package.json` and set your GitHub Pages URL:
```json
"homepage": "https://YOUR_USERNAME.github.io/lakiitu-emulator"
```

### Deploy

```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

Or use the GitHub Actions workflow (automatic deployment).

## Tips

- **Data Storage**: All data is saved in your browser's localStorage
- **Profiles**: Create multiple profiles for different users
- **Custom Launcher Items**: Add shortcuts to websites or internal routes
- **Recent Games**: Your recently viewed games appear in the Game Launcher

## Browser Limitations

- **Cannot launch RetroArch**: Browsers cannot execute local applications
- **File Selection**: Limited to file info, not full paths
- **Window Controls**: Hidden in browser (browser handles this)

The app will show helpful messages when these limitations are encountered.

Enjoy your retro gaming experience! 🎮
