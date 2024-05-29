import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'

const Navbar = () => {

  const {isLogged, setIsLogged} = useAuth()
  
  useEffect(() => {
    console.log(isLogged)
  }, [])

  return (
    <AppBar position='static'>
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
        >
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
          <NavLink to="/profile">
            <Typography
              variant="h5"
              component="div"
              sx={{flexGrow: 1, color: 'white'}}
              >
              Profile  
            </Typography>
          </NavLink>
          <NavLink to="/"
            onClick={() => {localStorage.clear(); setIsLogged(false);}}
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
