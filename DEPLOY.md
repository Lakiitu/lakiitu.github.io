# Deploying to GitHub Pages

## Method 1: Using GitHub Actions (Recommended)

1. Push your code to GitHub
2. The workflow in `.github/workflows/deploy.yml` will automatically deploy when you push to `main`
3. Go to your repository Settings > Pages
4. Select "GitHub Actions" as the source
5. Your site will be available at `https://YOUR_USERNAME.github.io/lakiitu-emulator`

## Method 2: Manual Deployment

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json` homepage field with your GitHub Pages URL:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/lakiitu-emulator"
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## Important Notes

- The app uses HashRouter (routes with `#`) for GitHub Pages compatibility
- All data is stored in browser localStorage
- Game launching is limited in browsers (security restrictions)
- Users can still manage profiles, customize launchers, and view game information

## Browser Limitations

Since this is a web app, some features are limited:
- **Cannot launch RetroArch**: Browsers cannot execute local applications
- **Cannot access full file paths**: File selection is limited
- **No window controls**: Browser handles window management

The app will show helpful messages when these limitations are encountered.

