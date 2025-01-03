import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  FormControl, 
  FormLabel, 
  Select, 
  MenuItem
} from '@mui/material';
import api from '../../services/api';
import useCustomNavigates from '../../hooks/useCustomNagivates.js';

function CadastroForm({ fields, submitUrl, successMessage, errorMessage }) {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [formData, setFormData] = useState(initialState);
  const [tipos, setTipos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [error, setError] = useState('');
  const [loadingOptions, setLoadingOptions] = useState(true);
  const { goTo } = useCustomNavigates();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [tiposResponse, empresasResponse] = await Promise.all([
          api.get('/tipos_funcionarios'),
          api.get('/empresas')
        ]);
        
        setTipos(tiposResponse.data.tipos_funcionarios || []);
        setEmpresas(empresasResponse.data.empresas || []);
      } catch (err) {
        setError('Erro ao carregar as opções');
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post(submitUrl, formData);
      alert(successMessage);
      setFormData(initialState);
      goTo('/admin/dashboard');
    } catch (err) {
      setError(errorMessage);
    }
  };

  const handleCancel = () => {
    goTo('/admin/dashboard');
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{successMessage.split(' ')[0]}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
              <MenuItem value=""><em>Selecione</em></MenuItem>
              {field.name === 'tipo_id' ? (
                tipos.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.descricao}
                  </MenuItem>
                ))
              ) : field.name === 'empresa_id' ? (
                empresas.map((empresa) => (
                  <MenuItem key={empresa.id} value={empresa.id}>
                    {empresa.nome}
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
      ))}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Cadastrar
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

export default CadastroForm;
