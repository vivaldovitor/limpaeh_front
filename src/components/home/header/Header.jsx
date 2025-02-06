import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import { Title, StyledButton } from '/src/styles/Toolbar.js'

function Header() {

  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h5">
          LimpAeh
        </Title>
        <Box>
          <Link to="/login">
          <StyledButton>
            Login
          </StyledButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
