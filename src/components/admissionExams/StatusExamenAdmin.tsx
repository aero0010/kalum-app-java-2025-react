import { Box, Table, CircularProgress, Container, TablePagination, Paper, TableContainer, TableHead, Typography, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { useEffect, useState } from "react"
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const StatusExamenAdmin = () => {
    const [resultadosExamenAdmision, setResultadoExamenAdmision] = useState<ResultadoExamenAdmsion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const fetchResultadoExamenesAdmision = () => {
        setTimeout(() => {
            const resultados = [{
                noExpediente: 'EXP-20240011',
                anio: '2025',
                descripcion: 'Pendiente resultado del examen de admisión',
                nota: 0
            }];
            setResultadoExamenAdmision(resultados);
            setLoading(false);
        }, 3000);
    }

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    useEffect(() => {
        fetchResultadoExamenesAdmision();
    }, []);

    const paginatedResultadoExamenAdmision = resultadosExamenAdmision.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return(
        <Container sx={{ mt: 10}}>
            <Typography variant="h4" gutterBottom>Calendario de exámenes de admisión</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No. EXPEDIENTE</TableCell>
                            <TableCell>AÑO</TableCell>
                            <TableCell>DESCRIPCIÓN</TableCell>
                            <TableCell>NOTA</TableCell>
                            <TableCell align="right">ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedResultadoExamenAdmision.map((
                            (resultadoExamenAdmin) => (
                                <TableRow key={resultadoExamenAdmin.noExpediente}>
                                    <TableCell>{resultadoExamenAdmin.noExpediente}</TableCell>
                                    <TableCell>{resultadoExamenAdmin.anio}</TableCell>
                                    <TableCell>{resultadoExamenAdmin.descripcion}</TableCell>
                                    <TableCell>{resultadoExamenAdmin.nota}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary">
                                            <AssignmentIndIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                        {paginatedResultadoExamenAdmision.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align='center'>
                                    Aún no hay resultados cargados en el sistema.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination component="div" count={resultadosExamenAdmision.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPageOptions={[5, 10, 20]}/>
            </TableContainer>
        </Container>
    )
}

interface ResultadoExamenAdmsion {
    noExpediente: string;
    anio: string;
    descripcion: string;
    nota: number
}