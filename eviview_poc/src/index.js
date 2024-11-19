import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this contains your global CSS or Tailwind setup
import App from './App';

// Import Material-UI's ThemeProvider
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme'; // Custom theme file for Material-UI

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline ensures Material-UI applies default styling for body */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Removed `reportWebVitals` as it's not needed at this stage.
