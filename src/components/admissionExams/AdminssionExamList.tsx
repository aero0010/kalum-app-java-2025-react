import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, type SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

type Params = {
    careerId: string;
}

export const AdmissionExamList = () => {
    const navigate = useNavigate();
    const [apellidos, setApellidos] = useState('');
    const [nombres, setNombres] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const { careerId } = useParams<Params>();
    const [admissionExams, setAdmissionExams] = useState<AdmissionExam[]>([]);
    const [careers, setCareers] = useState<Career[]>([]);
    const [academicDays, setAcademicDays] = useState<AcademicDay[]>([]);
    const [admissionExamSelected, setAdmissionExamSelected] = useState<AdmissionExam | null>(null);
    const [careerSelected, setCareerSelected] = useState<Career | null>(null);
    const [academicDaySelected, setAcademicDaySelected] = useState<AcademicDay | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState<boolean>(true);
    const [modelOpen, setModelOpen] = useState<boolean>(false);

    const fetchAdmissionExams = () => {
        setTimeout(() => {
            const dataAdmissionExams = [
                {examenId: '1', fechaExamen: '2025-11-20T10:30:00'},
                {examenId: '2', fechaExamen: '2025-11-30T14:30:00'},
                {examenId: '3', fechaExamen: '2025-12-10T10:30:00'}
            ];
            const dataCareers = [
                {carreraId: '1', nombre: 'Desarrollo de aplicaciones moviles con android'},
                {carreraId: '2', nombre: 'Desarrollador FullStack en Java EEE & React'},
                {carreraId: '3', nombre: 'Desarrollador FullStack con DotnCore 9 & Angular'},
                {carreraId: '4', nombre: 'Desarrollo de aplicaciones moviles con Swit'},
                {carreraId: '5', nombre: 'Dominio de contenedores con Docker'},
                {carreraId: '6', nombre: 'Despliegue de aplicaciones con Kubernetes'}
            ];
            const dataAcademicDays = [
                {
                    jornadaId: '1',
                    jornada: 'Jornada Matutina',
                    prefijo: 'JM'
                },
                {
                    jornadaId: '2',
                    jornada: 'Jornada Vespertina',
                    prefijo: 'JV'
                },
                {
                    jornadaId: '3',
                    jornada: 'Jornada Sabatina',
                    prefijo: 'JS'
                }
            ]
            setAdmissionExams(dataAdmissionExams);
            setCareers(dataCareers);
            setAcademicDays(dataAcademicDays);            
            setLoading(false);
            if(careerId) {
                const career = dataCareers.find(c => c.carreraId === careerId);
                setCareerSelected(career ?? null);
            }
        }, 3000);
    }
    useEffect(() => {
        fetchAdmissionExams();
    }, []);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    const paginatedAdmissionExam = admissionExams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (loading) {
        return(
            <Box sx={{ display: 'flex', justifyContent:'center', mt:10 }}>
                <CircularProgress/>
            </Box>
        );
    }

    const handlerOpenModal = (examId: string) => {
        const exam = admissionExams.find(e => e.examenId === examId)
        if (exam) {
            setAdmissionExamSelected(exam ?? null);
        }
        setModelOpen(true);
    }

    const handlerCloseModal = () =>{
        setModelOpen(false);
    }

    const handlerChangeAdmissionExam = (event: SelectChangeEvent<string>) => {
        const id = event.target.value;
        const selected = admissionExams.find( x => x.examenId === id) || null;
        setAdmissionExamSelected(selected);
    }

    const handlerChangeCareer = (event: SelectChangeEvent<string>) => {
        const id = event.target.value;
        const selected = careers.find( x => x.carreraId === id) || null;
        setCareerSelected(selected);
    }

    const handlerChangeAcademicDay = (event: SelectChangeEvent<string>) => {
        const id = event.target.value
        const selected = academicDays.find(x => x.jornadaId === id) || null;
        setAcademicDaySelected(selected);
    }

    const handlerEnrollar = () => {
        handlerCloseModal();

        

        Swal.fire({
            title: 'Solicitud examen de admision',
            text: 'Su solicitud fue enviada exitosamente, pronto recibira un correo con la información para finalizar el proceso',
            icon: 'success',
            footer: 'Kalum v1.0.0'
        }).then(response => {
            if(response.isConfirmed) {
                navigate('/status-examen-admision');
            }
        });
    }

    return(
        <Container sx={{ mt: 10}} >
            <Typography variant='h4' gutterBottom>Calendario de exámenes de Admisión</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Fecha Examen</TableCell>
                            <TableCell align='right'>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedAdmissionExam.map((
                            (admissionExam) => (
                                <TableRow key={admissionExam.examenId}>
                                    <TableCell>{admissionExam.examenId}</TableCell>
                                    <TableCell>{admissionExam.fechaExamen}</TableCell>
                                    <TableCell align='right'>
                                        <IconButton color='primary' onClick={() => handlerOpenModal(admissionExam.examenId)}>
                                            <AssignmentAddIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                        {paginatedAdmissionExam.length === 0 && (
                            <TableRow>
                                <TableCell>
                                    No hay registros de exámenes de Admisión
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination component="div" count={admissionExams.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPageOptions={[5, 10, 20]}/>
            </TableContainer>
            <Dialog open={modelOpen} fullWidth maxWidth="sm" onClose={() => handlerCloseModal()}>
                <DialogTitle>Solicitud de examene de Admisión</DialogTitle>
                <DialogContent>
                    <TextField label="Apellidos" fullWidth margin='normal' value={apellidos} onChange={(e) => setApellidos(e.target.value)}/>
                    <TextField label="Nombres" fullWidth margin='normal' value={nombres} onChange={(e) => setNombres(e.target.value)} />
                    <TextField label="Direccion" fullWidth margin='normal' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    <TextField label="Telefono" fullWidth margin='normal' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    <TextField label="Email" fullWidth margin='normal' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputLabel>Examen admisión</InputLabel>
                    <Select label="Examen admisión" fullWidth value={admissionExamSelected?.examenId?? ""} onChange={handlerChangeAdmissionExam}>
                        {admissionExams.map((e) => (
                            <MenuItem key={e.examenId} value={e.examenId}>{e.fechaExamen}</MenuItem>
                        ))}
                    </Select>
                      <InputLabel>Carreras Técnicas</InputLabel>
                    <Select label="Carrera Técnica" fullWidth value={careerSelected?.carreraId ?? ""} onChange={handlerChangeCareer}>
                        {careers.map((e) => (
                                <MenuItem key={e.carreraId} value={e.carreraId}>{e.nombre}</MenuItem>
                            ))}
                    </Select>
                    <InputLabel>Jornadas</InputLabel>
                    <Select label="Jornada" fullWidth value={academicDaySelected?.jornadaId ?? ""} onChange={handlerChangeAcademicDay}>
                        {academicDays.map((e) => (
                                <MenuItem key={e.jornadaId} value={e.jornadaId}>{e.prefijo} - {e.jornada}</MenuItem>
                            ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlerCloseModal}>Cancelar</Button>
                    <Button onClick={handlerEnrollar} variant='contained'>Enrolar</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

interface AdmissionExam {
    examenId: string;
    fechaExamen: string;
}

interface Career {
    carreraId: string;
    nombre: string;
}

interface AcademicDay {
    jornadaId: string;
    jornada: string;
    prefijo: string;
}