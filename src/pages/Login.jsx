import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import api from '../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Função para atualizar os campos do formulário
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '', general: '' }); // Limpa os erros ao digitar
  };

  // Função para validar e submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: '', password: '', general: '' };

    // Validação do email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido.';
      valid = false;
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = 'A senha é obrigatória.';
      valid = false;
    }

    if (valid) {
      setIsLoading(true);

      try {
        // Envia a requisição para o backend
        const response = await api.post('/login', {
          email: formData.email,
          password: formData.password,
        });

        // Se o login for bem-sucedido, armazena o token no localStorage
        console.log('Login bem-sucedido:', response.data);
        alert('Login realizado com sucesso!');
        localStorage.setItem('token', response.data.token); // Armazena o token

        // Você pode redirecionar para outra página após o login, se necessário
        window.location.href = '/dashboard'; // Exemplo de redirecionamento

      } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.',
        }));
      } finally {
        setIsLoading(false); // Desativa o loading
      }
    } else {
      setErrors(newErrors); // Atualiza os erros de validação
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
      {/* Exibe o erro geral, se houver */}
      {errors.general && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{errors.general}</div>}

      {/* Campo de email */}
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
      
      {/* Campo de senha */}
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
        helperText={errors.password}
        sx={{ mt: 2 }}
        required
      />
      
      {/* Botão de login */}
      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ mt: 3 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
      </Button>
    </Box>
  );
}

export default Login;
