import React from 'react';
import { Card, CardContent } from '@mui/material';
import { CardTitle, CardDescription, CardButton } from '/src/styles/CardStyles.js'; 
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: theme.shadows[5],
  maxWidth: 400,
  margin: '20px auto',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

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
        <CardButton variant="contained" color="secondary" style={{ marginTop: '10px' }}>
          Começar Agora
        </CardButton>
      </CardContent>
    </StyledCard>
  );
}

export default FeaturesCard;
