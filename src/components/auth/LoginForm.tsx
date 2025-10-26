import React from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Container, Typography, TextField, Button, Alert, Box } from '@mui/material';


interface LoginFormProps {
    onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {

    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password).then((response: any) => {
            if (response.data.token) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Exitoso',
                    text: `Bienvenido, ${email}!`,
                }).then((confirm) => {
                    if (confirm.isConfirmed) {
                        
                        onLoginSuccess();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Login',
                    text: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
                }).then((confirm) => {
                    if (confirm.isConfirmed) {
                        setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
                        console.log(confirm);
                    }
                });
            }
        });
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="User"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                )}
                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Iniciar Sesión
                    </Button>
                </Box>
            </form>
        </Container>
    )
}
