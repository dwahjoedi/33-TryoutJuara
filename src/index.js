import './index.css'; // Baris ini WAJIB ada
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Import ini
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter> {/* Bungkus di sini */}
      <App />
    </HashRouter>
  </React.StrictMode>
);