import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  "apiKey": import.meta.env.VITE_apiKey,
  "authDomain": import.meta.env.VITE_authDomain,
  "projectId": import.meta.env.VITE_projectId,
  "storageBucket": import.meta.env.VITE_storageBucket,
  "messagingSenderId": import.meta.env.VITE_messagingSenderId,
  "appId": import.meta.env.VITE_appId,
  "measurementId": import.meta.env.VITE_measurementId,
};
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
