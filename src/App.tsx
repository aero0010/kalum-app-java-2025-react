import './App.css'
import { CssBaseline } from '@mui/material'
import { useState } from 'react'
import { AppBarMenu } from './components/layout/AppBarMenu'
import { SideNav } from './components/layout/SideNav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import Swal from 'sweetalert2';

function App() {

  const [ draewerOpen, setDrawerOpen ] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!draewerOpen);
    console.log("Menu clicked", draewerOpen);
  }

  const handleLogout = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Logout',
      text: 'Estas seguro de cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        window.location.href = '/login';
      }
    });
  }

  return (
    <Router>
      <CssBaseline />
      <AppBarMenu onMenuClick={handleDrawerToggle} onLogout={handleLogout}></AppBarMenu>
      <SideNav open={draewerOpen} onClose={handleDrawerToggle}></SideNav>
      <Routes>
        <Route path="/login" 
        element={<LoginForm onLoginSuccess={() => window.location.href = '/'}/>} />
      </Routes>
    </Router>
  )
}

export default App
