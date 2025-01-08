import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import api from '../../services/api';
import useCustomNavigate from '../../hooks/useCustomNagivate.js';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { GoTypography } from 'react-icons/go';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { user, setTokenAndUser } = useAuth();
  const { goTo } = useCustomNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '', general: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: '', password: '', general: '' };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido.';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'A senha é obrigatória.';
      valid = false;
    }

    if (valid) {
      setIsLoading(true);

      try {
        const response = await api.post('/login', {
          email: formData.email,
          senha: formData.password,
        });

        alert('Login realizado com sucesso!');
        setTokenAndUser(response.data.token);
        const decoded = jwtDecode(response.data.token)

        if (decoded.sub.tipo_id === 1) {
          goTo('/admin');
        } else if (decoded.sub.tipo_id === 2) {
          goTo('/supervisor');
        } else if (decoded.sub.tipo_id === 3) {
          goTo('/unauthorized');
        }
           

      } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);

        setErrors((prevErrors) => ({
          ...prevErrors,
          general: error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.',
        }));
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 4,
        mx: 'auto',
        maxWidth: 400,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      {errors.general && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
          {typeof errors.general === 'string' ? errors.general : 'Erro desconhecido'}
        </div>
      )}

      <h2>Login</h2>

      {/* Campo de Email */}
      <TextField
        fullWidth
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        aria-label="Digite seu email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
      />

      {/* Campo de Senha */}
      <TextField
        fullWidth
        id="password"
        label="Senha"
        type="password"
        variant="outlined"
        aria-label="Digite sua senha"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={typeof errors.password === 'string' ? errors.password : ''}
        sx={{ mt: 2 }}
        required
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ mt: 3 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
      </Button>
      <Button
        fullWidth
        variant="outlined"
        type="button"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={() => goTo('/')}
      >
        Voltar
      </Button>
    </Box>
  );
}

export default SignIn;
