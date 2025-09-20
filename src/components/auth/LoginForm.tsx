import React from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Container, Typography, TextField, Button, Alert, Box } from '@mui/material';


interface LoginFormProps {
    onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('El correo electrónico no es válido.');
            console.log("Email no valido");
            return;
        }

        // Example: check if password is empty or too short
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            console.log("Password no valido");
            return;
        }

        setError(null);

        Swal.fire({
            icon: 'success',
            title: 'Login Exitoso',
            text: `Bienvenido, ${email}!`,
        }).then((confirm) => {
            if (confirm.isConfirmed) {
                onLoginSuccess();
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
                    label="Email"
                    type="email"
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
