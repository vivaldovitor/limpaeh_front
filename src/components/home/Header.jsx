import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import useCustomNavigate from '../../hooks/useCustomNagivates';

const Title = styled(Typography)(() => ({
  flexGrow: 1,
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: '1.8rem',
  color: '#fff',
  letterSpacing: '2px',
  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', // Sombra para dar destaque
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main, // Usando a cor primária do tema
  padding: '8px 20px',
  borderRadius: '30px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main, // Usando a cor secundária do tema
  },
}));

function Header() {
  const { goTo } = useCustomNavigate(); 

  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h5">
          LimpAeh
        </Title>
        <Box>
          <StyledButton onClick={() => goTo('/login')}>
            Login
          </StyledButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
