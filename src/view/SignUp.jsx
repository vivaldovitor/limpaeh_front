import { useState } from "react";
import { TextField, Button, Box } from '@mui/material';
import useCustomNavigate from "/src/hooks/useCustomNagivates";

function SignUp() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoId, setTipoId] = useState('');
    const [empresaId, setEmpresaId] = useState('');
    const { goTo } = useCustomNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o comportamento padrão de recarregar a página

        const userData = {
            nome,
            email,
            senha,
            tipo_id: tipoId,
            empresa_id: empresaId,
        };

        console.log("Cadastro realizado!", userData);
        goTo('/dashboard');
    };

    return (
        <Box component="form"
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
            <h2>Cadastro</h2>

            <TextField
                label="Nome"
                type="text"
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <TextField
                label="Senha"
                type="password"
                fullWidth
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <TextField
                label="Tipo de Usuário (ID)"
                type="number"
                fullWidth
                value={tipoId}
                onChange={(e) => setTipoId(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <TextField
                label="ID da Empresa"
                type="number"
                fullWidth
                value={empresaId}
                onChange={(e) => setEmpresaId(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <Button variant="contained" color="primary" fullWidth type="submit">
                Cadastrar
            </Button>
        </Box>
    );
}

export default SignUp;
