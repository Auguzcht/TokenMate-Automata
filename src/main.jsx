import React from 'react';
import ReactDOM from 'react-dom/client';
import { TokenizerProvider } from './context/TokenizerContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TokenizerProvider>
      <App />
    </TokenizerProvider>
  </React.StrictMode>
);
