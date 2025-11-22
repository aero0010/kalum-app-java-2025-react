import './App.css'
import Swal from 'sweetalert2';
import { CssBaseline } from '@mui/material'
import { useState } from 'react'
import { AppBarMenu } from './components/layout/AppBarMenu'
import { SideNav } from './components/layout/SideNav';
import { LoginForm } from './components/auth/LoginForm';
import { CareerList } from './components/careers/CareerList';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserList } from './components/users/UserList';
import { Dashboard } from '@mui/icons-material';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [ draewerOpen, setDrawerOpen ] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!draewerOpen);
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
        logout();
        window.location.href = '/login';
      }
    });
  }

  return (
    <Router>
      <CssBaseline />
      {isAuthenticated && (
        <>
          <AppBarMenu onMenuClick={handleDrawerToggle} onLogout={handleLogout}></AppBarMenu>
          <SideNav open={draewerOpen} onClose={handleDrawerToggle}></SideNav>
        </>
      )}
      <Routes>
        <Route path="/login" 
        element={<LoginForm onLoginSuccess={() => window.location.href = '/dashboard'}/>} />
        <Route path='/dashboard' element={
          <Dashboard/>
        }/>
        <Route path='/careers' 
        element={
          <ProtectedRoute>
            <CareerList />
          </ProtectedRoute>
        } />
        <Route 
          path='/users' 
          element={
            <ProtectedRoute>
              <UserList/>
            </ProtectedRoute>
             
          }/>
        <Route path='/' element={ <Navigate to='/dashboard' />} />
      </Routes>
    </Router>
  )
}

export default App
