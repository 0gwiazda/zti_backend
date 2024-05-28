import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
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
          <NavLink to="/login">
            <Typography
              variant="h5"
              component="div"
              sx={{flexGrow: 1, color: 'white'}}
              >
              Login  
            </Typography>
          </NavLink>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
