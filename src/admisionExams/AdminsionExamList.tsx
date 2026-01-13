import { useEffect, useState } from 'react'
import {
    Box,
    CircularProgress,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material'
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd'

export const AdminsionExamList = () => {

    const [admissionExamns, setAdmissionExamns] = useState<AdmisionExamn[]>([]);
    
    const [ careerSelected, setCareerSelected] = useState<Career>()
    
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(true);
    const [modelOpen, setModelOpen] = useState<boolean>(false);

    const fetchAdminssionExams = () => {
        setTimeout(() => {
            const data = [
                {
                    examenID: 1,
                    fechaExamen: '2025-11-20T10:30:00'
                },
                {
                    examenID: 2,
                    fechaExamen: '2025-12-20T10:30:00'
                },
                {
                    examenID: 3,
                    fechaExamen: '2025-13-20T10:30:00'
                }
            ];
            setAdmissionExamns(data);
        }, 3000);
    }

    useEffect(() => {
        fetchAdminssionExams();
    }, []);

    const paginatedAdmissionExam = admissionExamns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    const handlerOpenModal = () => {
        setModelOpen(true);
    }

    const handlerCloseModal = () => {
        setModelOpen(false);
    }

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant='h4' gutterBottom>Calendario de Examenes de Admisión</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableCell>ID</TableCell>
                        <TableCell>Fecha Exámen</TableCell>
                        <TableCell align='right' >Acciones</TableCell>
                    </TableHead>
                    <TableBody>
                        {paginatedAdmissionExam.map((
                            adminsionExam => (
                                <TableRow key={adminsionExam.examenID}>
                                    <TableCell>{adminsionExam.examenID}</TableCell>
                                    <TableCell>{adminsionExam.fechaExamen}</TableCell>
                                    <TableCell align='right'>
                                        <IconButton color='primary' onClick={() => handlerOpenModal()}>
                                            <AssignmentAddIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                        {paginatedAdmissionExam.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align='center'>
                                    No hay registros de examenes de admisión
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                // add here the pagination stuff
            </TableContainer>
            <Dialog open={modelOpen} fullWidth maxWidth='sm' onClose={() => handlerCloseModal()}>
                <DialogTitle>Solicitud de exámen de adminsión</DialogTitle>
                <DialogContent>
                    <TextField label="Apellidos" fullWidth margin='normal'/>
                    <TextField label="Nombres" fullWidth margin='normal'/>
                    <TextField label="Dirección" fullWidth margin='normal'/>
                    <TextField label="Teléfono" fullWidth margin='normal'/>
                    <TextField label="Correo Electrónico" fullWidth margin='normal'/>

                    <InputLabel>Exámen de admisión</InputLabel>
                    <Select label="Adminsión Exámen" fullWidth>
                        <MenuItem>Desarrollo de aplicaciones full stack con Java</MenuItem>
                    </Select>
                    <InputLabel>Carreras Técnicas</InputLabel>
                    <Select label="Carrera Técnica" fullWidth>
                        
                    </Select>
                </DialogContent>
            </Dialog>
        </Container>

    )
}

interface AdmisionExamn {
    examenID: number;
    fechaExamen: string;
}

interface Career {
    carreraID: number;
    nombre: string;
}
