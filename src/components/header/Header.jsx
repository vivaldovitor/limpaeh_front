import React from 'react';
import { AppBar, Toolbar} from '@mui/material';
import { Title } from '/src/styles/Toolbar.js'

function Header({ titulo }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h5">
            {titulo}
        </Title>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
