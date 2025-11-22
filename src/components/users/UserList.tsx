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
import { SolarPower, Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';


interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    identityUser: string;
    phoneNumber: string;
    passwordHash: string;
    createdAt: string;
}

export const UserList: React.FC = () => {

    const { users, getUsers, createUser, updateUserThunk, deleteUser } = useUser();
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formUsername, setFormUserName] = useState<string>('');
    const [formFirstName, setFormFirstName] = useState<string>('')
    const [formLastName, setFormLastName] = useState<string>('')
    const [formEmail, setFormEmail] = useState<string>('');
    const [formPhoneNumber, setPhoneNumber] = useState<string>('');
    const [formPassword, setFormPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getUsers();
            setLoading(false);
        }
        fetchData();
    }, []);


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleOpenDialog = (user?: any) => {
        if (user) {
            console.log(user);
            setSelectedUser(user);
            setFormUserName(user.username);
            setFormFirstName(user.firstname);
            setFormLastName(user.lastname);
            setFormEmail(user.email);
            setPhoneNumber(user.phoneNumber);

        } else {
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

    const handleSaveUser = async () => {
        let response: any;
        const data = {
            'username': formUsername,
            'firstname': formFirstName,
            'lastname': formLastName,
            'email': formEmail,
            'phoneNumber': formPhoneNumber,
            'password': formPassword
        };

        if (selectedUser) {
            response = await updateUserThunk(selectedUser.id, data);
            console.log('Updated');
            console.log(response);
        } else {
            response = await createUser(data);
            console.log('Created')
        }

        handleCloseDialog();

        if (response.success || response.status === 204) {

            Swal.fire({
                title: 'Usuarios',
                text: response.message ? response.message : 'El registro fue almacenado correctamente.',
                icon: 'success'
            });
        } else {
            Swal.fire({
                title: 'Usuarios',
                text: response.message ? response.message : 'El registro no fue almacenado correctamente.',
                icon: 'error'
            });
        }
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
                deleteUser(id).then(response => {
                    if (response.status == 204) {
                        Swal.fire({
                            title: "Eliminado",
                            text: "El registro fue eliminado correctamente",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Eliminado",
                            text: "Hubo un problema al momento de eliminar el registro",
                            icon: "error"
                        });
                    }
                });
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
                                <TableCell>USERNAME</TableCell>
                                <TableCell>FULL NAME</TableCell>
                                <TableCell>EMAIL</TableCell>
                                <TableCell>IDENTITY</TableCell>
                                <TableCell>PHONE</TableCell>
                                <TableCell align='right'>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user: any) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.identityUser}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
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
            <Dialog open={openDialog} fullWidth maxWidth="sm" onClose={() => { handleCloseDialog() }} disableEnforceFocus>
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
                        label="Primer Nombre"
                        fullWidth
                        margin='normal'
                        value={formFirstName}
                        onChange={(e) => setFormFirstName(e.target.value)}
                    />
                    <TextField
                        label="Apellido"
                        fullWidth
                        margin='normal'
                        value={formLastName}
                        onChange={(e) => setFormLastName(e.target.value)}
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
                        label="Phone Number"
                        fullWidth margin='normal'
                        value={formPhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        margin="dense"
                        label="Password"
                        type={showPassword ? "text" : "password"}
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
