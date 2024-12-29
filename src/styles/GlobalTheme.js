import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',  // Cor principal (verde, por exemplo)
    },
    secondary: {
      main: '#ff9800',  // Cor secundária (laranja, por exemplo)
    },
    error: {
      main: '#f44336',  // Cor de erro (vermelho)
    },
    background: {
      default: '#f4f4f4',  // Cor de fundo
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',  // Fonte padrão
    h1: {
      fontSize: '2.2rem', // Estilo de título 1
      fontWeight: 700,
      color: '#333',
    },
    h2: {
      fontSize: '1.8rem', // Estilo de título 2
      fontWeight: 600,
      color: '#444',
    },
    body1: {
      fontSize: '1rem', // Estilo do texto comum
      color: '#555',
    },
  },
  shape: {
    borderRadius: 8,  // Bordas arredondadas padrão
  },
  spacing: 8,  // Espaçamento padrão
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained', // Definindo o estilo padrão dos botões
      },
      styleOverrides: {
        root: {
          textTransform: 'none',  // Desabilita o uppercase por padrão
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove sombra da AppBar por padrão
        },
      },
    },
  },
});

export default theme;
