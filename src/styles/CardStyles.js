import { Typography, Button, Card } from '@mui/material';
import { styled } from '@mui/system';


// Título reutilizável para ambos os cards
export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: '16px',
}));

// Descrição reutilizável para ambos os cards
export const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.primary,
  marginBottom: '20px',
  lineHeight: '1.6',
}));

// Botão reutilizável para ambos os cards
export const CardButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '25px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Estilo reutilizável para ambos os cards
export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: theme.shadows[5],
  maxWidth: 400,
  margin: '20px auto',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));
