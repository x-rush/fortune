import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bfff',
    },
    secondary: {
      main: '#1e90ff',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#00bfff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00bfff',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a2e',
          color: '#ffffff',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: '20px !important',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingBottom: '8px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 191, 255, 0.2)',
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;