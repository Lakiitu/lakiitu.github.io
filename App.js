import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FirstTimeSetup from './components/FirstTimeSetup';
import Plaza from './components/Plaza';
import ProfileManager from './components/ProfileManager';
import LauncherCustomizer from './components/LauncherCustomizer';
import GameLauncher from './components/GameLauncher';
import Settings from './components/Settings';
import './App.css';
import './utils/storage'; // Initialize browser API

function App() {
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSetup = async () => {
      try {
        // Ensure browser API is loaded
        if (!window.electronAPI) {
          await import('./utils/storage');
        }
        const needsSetup = await window.electronAPI.checkFirstTimeSetup();
        setIsFirstTime(needsSetup);
      } catch (error) {
        console.error('Error checking setup:', error);
        setIsFirstTime(true);
      } finally {
        setLoading(false);
      }
    };

    checkSetup();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Lakiitu Emulator...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/setup" 
            element={<FirstTimeSetup onComplete={() => setIsFirstTime(false)} />} 
          />
          <Route 
            path="/plaza" 
            element={isFirstTime ? <Navigate to="/setup" /> : <Plaza />} 
          />
          <Route 
            path="/profiles" 
            element={isFirstTime ? <Navigate to="/setup" /> : <ProfileManager />} 
          />
          <Route 
            path="/launcher" 
            element={isFirstTime ? <Navigate to="/setup" /> : <LauncherCustomizer />} 
          />
          <Route 
            path="/games" 
            element={isFirstTime ? <Navigate to="/setup" /> : <GameLauncher />} 
          />
          <Route 
            path="/settings" 
            element={isFirstTime ? <Navigate to="/setup" /> : <Settings />} 
          />
          <Route 
            path="/" 
            element={isFirstTime ? <Navigate to="/setup" /> : <Navigate to="/plaza" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

