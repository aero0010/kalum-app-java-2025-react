import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useNavigate } from 'react-router-dom';
import { PermContactCalendar } from '@mui/icons-material';

interface SideNavProps {
    open: boolean;
    onClose: () => void;
}

interface MenuItem {
    text: string;
    icon: React.ReactElement;
    path: string;
}


export const SideNav: React.FC<SideNavProps> = ({ open, onClose }) => {

    const navigate = useNavigate();

    const drawerWidth = 260;

    const menuItems: MenuItem[] = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Carreras Tecnicas', icon: <ScoolIcon />, path: '/careers' },
        { text: 'Usuarios', icon: <PeopleIcon />, path: '/users' },
        { text: 'Roles', icon: <SecurityIcon />, path: '/usuarios' },
        { text: 'Examenes de Admision', icon: <CalendarMonthIcon/>, path: '/examen-admision'},
        { text: 'Resultado examen Admision', icon: <PermContactCalendar/>, path: '/status-examen-admision'}
    ]

    const handlerItemClick = (path: string) => {
        navigate(path);
        onClose();
        console.log("Navegar a: ", path);
    }

    return (
        <Drawer anchor='left' open={open} onClose={onClose} ModalProps={{ keepMounted: true }}
            sx={{
                '& .MuiDrawer-paper': {

                    boxSizing: 'border-box',
                    top: '64px',  // Ajusta este valor si la altura de tu AppBar es diferente
                    height: 'calc(100% - 64px)'  // Ajusta este valor si la altura de tu AppBar es diferente
                },
            }}
        >
            <List sx={{ width: drawerWidth }}>
                {menuItems.map((item, index) => (
                    <ListItemButton key={index} onClick={() => { handlerItemClick(item.path) }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>

        </Drawer>
    )
}
