import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import api from '../../services/api';
import useCustomNavigates from '../../hooks/useCustomNagivates.js';
import useLoadOptions from '../../hooks/useLoadOptions.js';

function EditarForm({ fields, submitUrl, successMessage, errorMessage, id }) {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const { tipos, empresas, funcionarios, supervisores, setor_admin, ambientes, loadingOptions, error: loadError } = useLoadOptions();
  const { goTo } = useCustomNavigates();

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const response = await api.get(`${submitUrl}/${id}`);
        const data = response.data;
        const updatedData = {};
        fields.forEach((field) => {
          updatedData[field.name] = field.name === 'tipo_id' ? data.tipo?.id : data[field.name] || '';
        });
        setFormData(updatedData);
      } catch (err) {
        setError(errorMessage);
      }
    };

    loadData();
  }, [id, submitUrl, fields, errorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some(value => value === '')) {
      setError('Todos os campos são obrigatórios!');
      return;
    }
    try {
      await api.put(`${submitUrl}/${id}`, formData);
      alert(successMessage);
      goTo('/admin/dashboard');
    } catch (err) {
      setError(errorMessage);
    }
  };

  const handleCancel = () => {
    goTo('/admin/dashboard');
  };

  if (loadingOptions) return <p>Carregando opções...</p>;

  const renderField = (field) => {
    const optionsMap = {
      supervisor_id: supervisores,
      setor_admin_id: setor_admin,
      funcionario_id: funcionarios.filter(f => f.tipo.descricao === 'funcionário'),
      tipo_id: tipos,
      empresa_id: empresas,
      ambiente_id: ambientes
    };

    const options = optionsMap[field.name] || [];

    return (
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
            <MenuItem value=""><em>Selecione</em></MenuItem>
            {options.length ? (
              options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nome || item.descricao} {item.tipo && item.tipo.descricao ? `(${item.tipo.descricao})` : ''}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>Sem opções disponíveis</MenuItem>
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
    );
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{successMessage.split(' ')[0]}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loadError && <p style={{ color: 'red' }}>{loadError}</p>}

      {fields.map((field) => renderField(field))}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Atualizar
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
