import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid2, Box, Typography, Divider, Button, Paper } from '@mui/material';

function UserProfile({ nome, email, funcao, empresa }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '30px',
        margin: '20px auto',
        maxWidth: '800px',
        borderRadius: '12px',
      }}
    >
      <Grid2 container spacing={3} alignItems="center">
        <Grid2 item xs={12} md={3} sx={{ textAlign: 'center' }}>
          <Avatar sx={{ width: 100, height: 100, fontSize: 40 }}>{nome.charAt(0)}</Avatar>
        </Grid2>
        <Grid2 item xs={12} md={9} sx={{ textAlign: 'left' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            {nome}
          </Typography>
          <Typography variant="h6" sx={{ color: 'gray' }}>
            {funcao}
          </Typography>
          {empresa && (
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              <strong>Empresa / Instituição:</strong> {empresa}
            </Typography>
          )}
        </Grid2>
      </Grid2>
      <Divider sx={{ marginY: '20px' }} />
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="body1">
          <strong>Email:</strong> {email}
        </Typography>
      </Box>
    </Paper>
  );
}

UserProfile.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  funcao: PropTypes.string.isRequired,
  empresa: PropTypes.string,
};

export default UserProfile;
