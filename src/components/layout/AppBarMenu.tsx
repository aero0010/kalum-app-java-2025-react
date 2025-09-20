import React from 'react'
import { AppBar, IconButton, Menu, Toolbar, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';

interface AppBarMenuProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

export const AppBarMenu: React.FC<AppBarMenuProps> = ({onMenuClick, onLogout}) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: 2 }}>
            <MenuIcon/>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Kalum App
        </Typography>
        <Tooltip title="Cerrar Sesión">
          <IconButton color="inherit" onClick={onLogout}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}