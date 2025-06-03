// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind-output.css';  // compiled Tailwind
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; // ← import here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*  Wrap App in AuthProvider so useContext(AuthContext) works */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
