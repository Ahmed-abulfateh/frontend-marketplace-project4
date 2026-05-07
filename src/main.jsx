import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { MarketplaceProvider } from './context/MarketplaceContext.jsx';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(LanguageProvider, { children: _jsx(MarketplaceProvider, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }) }) }));
