import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

type Params = {
    noExpediente: string;
}

export const FinalizeCandidateProcess = () => {
    const navigate = useNavigate();
    const data = localStorage.getItem('user');
    const user = data? JSON.parse(data):null;
    const { noExpediente } = useParams<Params>();
    const [ email, setEmail ] = useState(user?.email);
    const [ identityUser, setIdentityUser ] = useState(noExpediente);

    const handleSubmit = () => {
        Swal.fire({
            title: 'Examen de admisión',
            icon: 'success',
            text: 'Su proceso de admisión fue actualizado exitosamente, consultar el status del examen de admisión',
            footer: 'Kalum V1.0.0'
        }).then(response => {
            if (response.isConfirmed) {
                navigate('/status-examen-admision');
            }
        })
    }

    return(
        <Container maxWidth="sm" sx={{ mt:10 }}>
            <Typography variant="h4" gutterBottom>Finaliar proceso de solicitud de examen</Typography>
            <form>
                <TextField label="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <TextField label="Identicficador" fullWidth margin="normal" value={identityUser} onChange={(e) => setIdentityUser(e.target.value)}/>
                <Box mt={2}>
                    <Button variant="contained" fullWidth onClick={handleSubmit}>Enviar</Button>
                </Box>
            </form>
        </Container>
    )
}