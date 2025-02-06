import React from 'react';
import { CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { CardTitle, CardDescription, StyledCard } from '/src/styles/CardStyles.js';
import  { StyledButton } from '/src/styles/Toolbar.js';

function FeaturesCard() {

  return (
    <StyledCard>
      <CardContent>
        <CardTitle variant="h5" gutterBottom>
          Funcionalidades
        </CardTitle>
        <CardDescription variant="body1">
          - Registro de limpezas<br />
          - Relatórios detalhados<br />
          - Monitoramento em tempo real
        </CardDescription>
        <Link to="/login">
        <StyledButton
          variant="contained"
          color="secondary" 
          style={{ marginTop: '10px' }}>
          Começar Agora
        </StyledButton>
        </Link>
      </CardContent>
    </StyledCard>
  );
}

export default FeaturesCard;
