import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initToolbar } from '@21st-extension/toolbar';

const stagewiseConfig = {
  plugins: [],
};

function setupStagewise() {
  if (process.env.NODE_ENV === 'development') {
    initToolbar(stagewiseConfig);
  }
}

setupStagewise();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
