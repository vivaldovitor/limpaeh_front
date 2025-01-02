import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormControl, FormLabel } from '@mui/material';
import api from '../../../services/api';

function EditarForm({ fields, submitUrl, successMessage, errorMessage, id, onSubmit }) {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${submitUrl}/${id}`);
        const data = response.data;

        setFormData((prevData) => {
          const updatedData = {};
          fields.forEach((field) => {
            updatedData[field.name] = data[field.name] || '';
          });
          return updatedData;
        });
        setLoading(false);
      } catch (err) {
        setError(errorMessage);
        setLoading(false);
      }
    };

    loadData();
  }, [id, submitUrl, fields, errorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.put(`${submitUrl}/${id}`, formData);
      alert(successMessage);
      onSubmit();
    } catch (err) {
      setError(errorMessage);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

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

export default EditarForm;
