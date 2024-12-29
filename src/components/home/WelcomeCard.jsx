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

function WelcomeCard() {
  return (
    <StyledCard>
      <CardContent>
        <CardTitle variant="h5" gutterBottom>
          Bem-vindo ao LimpAeh!
        </CardTitle>
        <CardDescription variant="body1">
          Um sistema moderno para gerenciar e organizar a limpeza do seu ambiente.
        </CardDescription>
        <CardButton variant="contained">
          Saiba Mais
        </CardButton>
      </CardContent>
    </StyledCard>
  );
}

export default WelcomeCard;
