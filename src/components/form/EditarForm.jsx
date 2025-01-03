import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import api from '../../services/api';
import useCustomNavigates from '../../hooks/useCustomNagivates.js';

function EditarForm({ fields, submitUrl, successMessage, errorMessage, id, onSubmit }) {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [loadingOptions, setLoadingOptions] = useState(false);
  const { goTo } = useCustomNavigates();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${submitUrl}/${id}`);
        const data = response.data;

        const updatedData = {};
        fields.forEach((field) => {
          updatedData[field.name] = field.type === 'select'
            ? data[field.name]?.id || ''
            : data[field.name] || '';
        });

        setFormData(updatedData);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, submitUrl, fields, errorMessage]);

  useEffect(() => {
    const loadOptions = async () => {
      setLoadingOptions(true);
      try {
        const loadedOptions = {};
        for (const field of fields.filter(f => f.type === 'select')) {
          const response = await api.get(field.optionsUrl);
  
          const data = field.name === 'tipo' ? response.data.tipos_funcionarios
                    : field.name === 'empresa' ? response.data.empresas
                    : response.data;
  
          loadedOptions[field.name] = data || [];
        }
        setOptions(loadedOptions);
      } catch (err) {
        console.error('Erro ao carregar opções:', err);
        setError('Erro ao carregar opções dos campos.');
      } finally {
        setLoadingOptions(false);
      }
    };
  
    loadOptions();
  }, [fields]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.put(`${submitUrl}/${id}`, formData);
      alert(successMessage);
      if (onSubmit) onSubmit();
      goTo('/admin/dashboard');
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      setError(`Erro ao atualizar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    goTo('/admin/dashboard');
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h6">{successMessage.split(' ')[0]}</Typography>

      {error && <Typography color="error" sx={{ marginBottom: '10px' }}>{error}</Typography>}

      {fields.map((field) => (
        <FormControl fullWidth sx={{ marginBottom: '10px' }} key={field.name}>
          <FormLabel>{field.label}</FormLabel>
          {field.type === 'select' ? (
            <Select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              fullWidth
              disabled={loadingOptions}
            >
              <MenuItem value="">
                <em>Selecione</em>
              </MenuItem>
              
              {Array.isArray(options[field.name]) ? (
                options[field.name].map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {field.name === 'tipo' ? item.descricao : item.nome}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <em>Opções não disponíveis</em>
                </MenuItem>
              )}
            </Select>
          ) : (
            <TextField
              name={field.name}
              type={field.type || 'text'}
              value={formData[field.name]}
              onChange={handleChange}
              fullWidth
            />
          )}
        </FormControl>
      ))}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        sx={{ marginBottom: '10px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Salvar'}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleCancel}
      >
        Cancelar
      </Button>
    </Box>
  );
}

export default EditarForm;
