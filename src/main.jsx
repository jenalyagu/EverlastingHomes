import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import MyEverlastingHome from './pages/MyEverlastingHome.jsx';
import Media from './pages/Media.jsx';
import WildfireRebuild from './pages/WildfireRebuild.jsx';
import DisasterResistantHomes from './pages/DisasterResistantHomes.jsx';
import LuxuryHomesTexas from './pages/LuxuryHomesTexas.jsx';
import './index.css';
import { initToolbar } from '@21st-extension/toolbar';

const stagewiseConfig = { plugins: [] };

if (process.env.NODE_ENV === 'development') {
  initToolbar(stagewiseConfig);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/my-everlasting-home" element={<MyEverlastingHome />} />
          <Route path="/media" element={<Media />} />
          <Route path="/wildfire-rebuild" element={<WildfireRebuild />} />
          <Route path="/disaster-resistant-homes" element={<DisasterResistantHomes />} />
          <Route path="/luxury-homes-texas" element={<LuxuryHomesTexas />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
