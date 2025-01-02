import { Button, Typography } from "@mui/material";
import { styled } from '@mui/system';

export const StyledButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    backgroundColor: theme.palette.primary.main, 
    padding: '8px 20px',
    borderRadius: '30px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main, 
    },
  }));
  
  export const Title = styled(Typography)(() => ({
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    color: '#fff',
    letterSpacing: '2px',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
  }));