// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Custom primary color
        },
        secondary: {
            main: '#dc004e', // Custom secondary color
        },
        background: {
            default: '#f5f5f5', // Default background color
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

export default theme;
