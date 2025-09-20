import './App.css'
import { CssBaseline } from '@mui/material'
import { useState } from 'react'
import { AppBarMenu } from './components/layout/AppBarMenu'
import { SideNav } from './components/layout/SideNav';

function App() {

  const [ draewerOpen, setDrawerOpen ] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!draewerOpen);
    console.log("Menu clicked", draewerOpen);
  }

  const handleLogout = () => {
    console.log("Logout clicked");
  }

  return (
    <>
      <CssBaseline />
      <AppBarMenu onMenuClick={handleDrawerToggle} onLogout={handleLogout}></AppBarMenu>
      <SideNav open={draewerOpen} onClose={handleDrawerToggle}></SideNav>
    </>
  )
}

export default App
