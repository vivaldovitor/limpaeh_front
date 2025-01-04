import React from 'react';
import { AppBar, Toolbar} from '@mui/material';
import { Title } from '/src/styles/Toolbar.js'

function SolicitacaoHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h5">
          LimpAeh - Solicitações
        </Title>
      </Toolbar>
    </AppBar>
  );
}

export default SolicitacaoHeader;
