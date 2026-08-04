import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

const MyEverlastingHome = lazy(() => import('./pages/MyEverlastingHome.jsx'));
const Media = lazy(() => import('./pages/Media.jsx'));
const WildfireRebuild = lazy(() => import('./pages/WildfireRebuild.jsx'));
const DisasterResistantHomes = lazy(() => import('./pages/DisasterResistantHomes.jsx'));
const LuxuryHomesTexas = lazy(() => import('./pages/LuxuryHomesTexas.jsx'));
const Team = lazy(() => import('./pages/Team.jsx'));
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
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/my-everlasting-home" element={<MyEverlastingHome />} />
            <Route path="/media" element={<Media />} />
            <Route path="/wildfire-rebuild" element={<WildfireRebuild />} />
            <Route path="/disaster-resistant-homes" element={<DisasterResistantHomes />} />
            <Route path="/luxury-homes-texas" element={<LuxuryHomesTexas />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
