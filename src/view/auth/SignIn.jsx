import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '@/services/api';
import useCustomNavigate from '../../hooks/useCustomNavigate.js';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { setTokenAndUser } = useAuth();
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

        setTokenAndUser(response.data.token);
        const decoded = jwtDecode(response.data.token);

        if (decoded.sub.tipo_id === 1) {
          goTo('/admin');
        } else if (decoded.sub.tipo_id === 2) {
          goTo('/supervisor');
        } else if (decoded.sub.tipo_id === 3) {
          goTo('/funcionario');
        }

        setOpenSnackbar(true);

      } catch (error) {
        setErrors({
          general: error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.',
        });
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
          {errors.general}
        </div>
      )}

      <h2>Login</h2>

      <TextField
        fullWidth
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
      />

      <TextField
        fullWidth
        id="password"
        label="Senha"
        type="password"
        variant="outlined"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
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

      <Link to="/">
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
      </Link>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Login realizado com sucesso!"
      />
    </Box>
  );
}

export default SignIn;
