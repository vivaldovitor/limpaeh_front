import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import useLoadOptions from '@/hooks/useLoadOptions';
import useCustomNavigate from '@/hooks/useCustomNavigate';
import api from '@/services/api';

function SolicitationForm() {
  const { user } = useAuth();
  const { goTo } = useCustomNavigate();
  const { supervisores, loadingOptions, error: loadError } = useLoadOptions();
  console.log("está aqui");
  
  const [formData, setFormData] = useState({
    descricao: '',
    supervisor_id: '',
    admin_id: user?.id || ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post('/solicitacoes', formData);
      alert('Solicitação cadastrada com sucesso!');
      goTo('/admin/solicitacoes');
    } catch (err) {
      setError('Erro ao cadastrar solicitação.');
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Cadastrar Solicitação</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loadError && <p style={{ color: 'red' }}>{loadError}</p>}

      <FormControl fullWidth sx={{ marginBottom: '10px' }}>
        <FormLabel>Descrição</FormLabel>
        <TextField name="descricao" value={formData.descricao} onChange={handleChange} fullWidth />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: '10px' }}>
        <FormLabel>Supervisor</FormLabel>
        <Select
          name="supervisor_id"
          value={formData.supervisor_id}
          onChange={handleChange}
          fullWidth
          disabled={loadingOptions}
        >
          <MenuItem value=""><em>Selecione</em></MenuItem>
          {supervisores.length ? (
            supervisores.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>Sem opções disponíveis</MenuItem>
          )}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
        Cadastrar
      </Button>
      <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => goTo('/admin/solicitacoes')}>
        Cancelar
      </Button>
    </Box>
  );
}

export default SolicitationForm;
