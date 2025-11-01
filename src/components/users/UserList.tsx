import React, { useEffect, useState } from 'react';
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
    DialogActions,
    InputAdornment,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Edition from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';


interface User {
    userId: string;
    username: string;
    email: string;
    passwordHash: string;
    identityUser: string;
    createdAt: string;
}

export const UserList: React.FC = () => {

    const { getUsers } = useUser();
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formUsername, setFormUserName] = useState<string>('');
    const [formEmail, setFormEmail] = useState<string>('');
    const [formPassword, setFormPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        setLoading(true);
        const data: any = await getUsers();
        setUsers(data.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleOpenDialog = (user?: User) => {
        if(user){
            setSelectedUser(user);
            setFormUserName(user.username);
        }else{
            setSelectedUser(null);
            setFormUserName('');
        }
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
        setFormUserName('');
    };

    const handleSaveUser = () => {
        handleCloseDialog();

        Swal.fire({
            title: 'Usuarios',
            text: 'El registro fue almacenado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleCloseDialog();
            }
        });

    };

    const handleDeleteUser = (id: any) => {
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
                const updatedCareers = users.filter(user => user.userId !== id);
                setUsers(updatedCareers);
                Swal.fire('Eliminado', 'La carrera ha sido eliminada.', 'success');
            }
        });
    }

    const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant='h4' gutterBottom>Usuarios</Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>
                Agregar Usuario
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
                                <TableCell>USUARIO</TableCell>
                                <TableCell>CORREO</TableCell>
                                <TableCell>Identidad</TableCell>
                                <TableCell>Creado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user:any) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.identityUser}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" color="primary" startIcon={<Edition />} sx={{ mr: 1 }} onClick={() => handleOpenDialog(user)}>
                                            Editar
                                        </Button>
                                        <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteUser(user.userId)}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {
                                paginatedUsers.length === 0 && loading && (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            No hay usuarios disponibles.
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={users.length}
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
            <Dialog open={openDialog} fullWidth maxWidth="sm" onClose={() => { handleCloseDialog() }}>
                {/* Formulario para agregar/editar carrera */}
                <DialogTitle>{selectedUser ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Usuario"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formUsername}
                        onChange={(e) => setFormUserName(e.target.value)}
                        defaultValue={selectedUser ? selectedUser.username : ''}
                    />
                    <TextField
                        margin="dense"
                        label="Correo Electronico"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        defaultValue={selectedUser ? selectedUser.email : ''}
                    />
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        edge='end'
                                        aria-label='toggle password visibility'
                                        >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        margin="dense"
                        label="Password"
                        type={ showPassword ? "text" : "password"}
                        fullWidth
                        variant="outlined"
                        value={formPassword}
                        onChange={(e) => setFormPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog()} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={() => { handleSaveUser() }} color="primary" variant="contained">
                        {selectedUser ? 'Guardar Cambios' : 'Agregar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
