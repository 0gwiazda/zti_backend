import { AppBar, Stack, Toolbar, Typography, useTheme } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'

const Navbar = () => {

  const theme = useTheme()
  const {isLogged, setIsLogged, isAdmin, setIsAdmin, setCurrentUserId} = useAuth()
  const [isArchived, setIsArchived] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    setIsArchived(location.pathname === '/offers/archive')
  }, [])

  return (
    <AppBar position='sticky'>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
        <NavLink to="/">
          <Typography
            variant="h5"
            component="div"
            sx={{flexGrow: 1, color: 'white'}}
            >
            Simple Allegro
          </Typography>
        </NavLink>
        <Stack
          direction="row"
          spacing={2}
          color="primary"
          sx={{backgroundColor: theme.palette.primary.main}}
        >
          {isAdmin &&
            <NavLink to="/admin">
              <Typography
                variant="h5"
                component="div"
                sx={{flexGrow: 1, color: 'white'}}
              >
                Admin Panel
              </Typography>
            </NavLink>
          }
          <NavLink to={!isArchived ? "/offers/archive" : "/"}>
            <Typography
            variant="h5"
            component="div"
            sx={{flexGrow: 1, color: 'white'}}
            >
              {!isArchived ? "Archived Offers" : "Current Offers"}  
            </Typography>
          </NavLink>
          {!isLogged ? (<>
          <NavLink to="/login">
            <Typography
              variant="h5"
              component="div"
              sx={{flexGrow: 1, color: 'white'}}
              >
              Login  
            </Typography>
          </NavLink>
          <NavLink to="/register">
            <Typography
              variant="h5"
              component="div"
              sx={{flexGrow: 1, color: 'white'}}
              >
              Register  
            </Typography>
          </NavLink></>) : (<>
          <NavLink to="/profile/">
            <Typography
              variant="h5"
              component="div"
              sx={{flexGrow: 1, color: 'white'}}
              >
              Profile  
            </Typography>
          </NavLink>
          <NavLink to="/"
            onClick={() => {localStorage.clear(); setIsLogged(false); setIsAdmin(false); setCurrentUserId(-1);}}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{flexGrow: 1, color: 'white'}}
              >
              Logout  
            </Typography>
          </NavLink>
          </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
