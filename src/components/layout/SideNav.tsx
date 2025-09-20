import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ScoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';

interface SideNavProps {
    open: boolean;
    onClose: () => void;
}

interface MenuItem {
    text: string;
    icon: React.ReactNode;
    path: string;
}


export const SideNav: React.FC<SideNavProps> = ({ open, onClose }) => {

    const drawerWidth = 260;

    const menuItems: MenuItem[] = [
        { text: 'Carreras Tecnicas', icon: <ScoolIcon />, path: '/carreras' },
        { text: 'Usuarios', icon: <PeopleIcon />, path: '/usuarios' }
    ]

    const handlerItemClick = (path: string) => {
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
