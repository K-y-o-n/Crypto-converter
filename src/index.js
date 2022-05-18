import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const basename = document.querySelector('base')?.getAttribute('href') ?? '/'

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);

