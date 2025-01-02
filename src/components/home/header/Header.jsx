import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import useCustomNavigate from '../../../hooks/useCustomNagivates';
import { Title, StyledButton } from '/src/styles/Toolbar.js'

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
