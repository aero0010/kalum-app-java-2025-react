import React, { useState} from 'react'
import { 
    Container, 
    Typography,
    Button,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    TablePagination,
    Box,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Edition from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';


export const CareerList = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const [formNombre, setFormNombre] = useState<string>('');

    React.useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            setTimeout(() => {
                const data: Career[] = [
                    { carreraId: 1, nombre: 'Ingeniería en Sistemas' },
                    { carreraId: 2, nombre: 'Licenciatura en Administración de Empresas' },
                    { carreraId: 3, nombre: 'Arquitectura' },
                    { carreraId: 4, nombre: 'Medicina' },
                    { carreraId: 5, nombre: 'Derecho' },
                    { carreraId: 6, nombre: 'Psicología' },
                    { carreraId: 7, nombre: 'Ingeniería Civil' },
                    { carreraId: 8, nombre: 'Contaduría Pública' },
                    { carreraId: 9, nombre: 'Comunicación Social' },
                    { carreraId: 10, nombre: 'Educación' }
                ];
                setCareers(data);
            }, 2000);
            
        } catch (error) {
            console.error('Error fetching careers:', error);
        } finally {
            setLoading(false);
        }
    };

    const paginatedCareers = careers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
    const handleOpenDialog = (career: Career | null) => {
        setSelectedCareer(career);
        setFormNombre(career ? career.nombre : '');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCareer(null);
        setFormNombre('');
    };

    const handleSaveCareer = () => {
        handleCloseDialog();

        Swal.fire({
            title: 'Carreras Técnicas',
            text: 'El registro fue almacenado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleCloseDialog();
            }});
        
    };

    const handleDeleteCareer = (careerId: number) => {
        Swal.fire({
            icon: 'warning',
            title: 'Eliminar Carrera',
            text: '¿Estás seguro de eliminar esta carrera?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCareers = careers.filter(career => career.carreraId !== careerId);
                setCareers(updatedCareers);
                Swal.fire('Eliminado', 'La carrera ha sido eliminada.', 'success');
            }
        });
    };
  
    return (
    <Container sx={{ mt: 10 }}>
        <Typography variant="h4" gutterBottom marginTop={2}>
            Lista de Carreras
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => handleOpenDialog(null)}>
            Agregar Carrera
        </Button>
        {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        ) : (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedCareers.map((career) => (
                        <TableRow key={career.carreraId}>
                            <TableCell>{career.carreraId}</TableCell>
                            <TableCell>{career.nombre}</TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" color="primary" startIcon={<Edition />} sx={{ mr: 1 }} onClick={() => handleOpenDialog(career)}>
                                    Editar
                                </Button>
                                <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />}
                                    onClick={() => handleDeleteCareer(career.carreraId)}>
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {
                        paginatedCareers.length === 0 && loading && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No hay carreras disponibles.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={careers.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </TableContainer>
        )}

        <Dialog open={openDialog} fullWidth maxWidth="sm" onClose={() => {handleCloseDialog()}}>
            {/* Formulario para agregar/editar carrera */}
            <DialogTitle>{selectedCareer ? 'Editar Carrera' : 'Agregar Carrera'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nombre de la Carrera"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formNombre}
                    onChange={(e) => setFormNombre(e.target.value)}
                    defaultValue={selectedCareer ? selectedCareer.nombre : ''}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseDialog()} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={() => {handleSaveCareer()}} color="primary" variant="contained">
                    {selectedCareer ? 'Guardar Cambios' : 'Agregar'}
                </Button>
            </DialogActions>
        </Dialog>
    </Container>
  )
}

interface Career {
    carreraId: number;
    nombre: string;
}