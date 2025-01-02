import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, FormLabel } from '@mui/material';
import api from '../../services/api';

function CadastroForm({ fields, submitUrl, successMessage, errorMessage }) {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post(submitUrl, formData);
      alert(successMessage);
      setFormData(initialState);
    } catch (err) {
      setError(errorMessage);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{successMessage.split(' ')[0]}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {fields.map((field) => (
        <FormControl fullWidth sx={{ marginBottom: '10px' }} key={field.name}>
          <FormLabel>{field.label}</FormLabel>
          <TextField
            name={field.name}
            type={field.type || 'text'}
            value={formData[field.name]}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>
      ))}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        {successMessage.split(' ')[0]}
      </Button>
    </Box>
  );
}

export default CadastroForm;
