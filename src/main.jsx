import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import MyEverlastingHome from './pages/MyEverlastingHome.jsx';
import Media from './pages/Media.jsx';
import './index.css';
import { initToolbar } from '@21st-extension/toolbar';

const stagewiseConfig = { plugins: [] };

if (process.env.NODE_ENV === 'development') {
  initToolbar(stagewiseConfig);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/my-everlasting-home" element={<MyEverlastingHome />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
