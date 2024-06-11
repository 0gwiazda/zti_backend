import { RouterProvider } from 'react-router-dom'
import { RouterPaths } from './utilities/Routes'
import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

function App() {

  const theme = createTheme({
    palette: {
      primary:{
        main: "#1976d2"
      },
      secondary:{
        main: "#b1edbe"
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          variant: "contained",
        },
        styleOverrides: {
          root:{
            backgroundColor: "#a2dbfa",
            color: "fff"
          }
        },
      },
      MuiContainer:{
        styleOverrides: {
          root:{
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }
        }
      },
      MuiCard:{
        styleOverrides: {
          root:{
            borderRadius: 15,
            padding: 5,
            margin: 8,
            backgroundColor: "#ebf2ff"
          }
        }
      },
      MuiStack:{
        styleOverrides: {
          root:{
            borderRadius: 15,
            padding: 5,
            margin: 8,
            backgroundColor: "#ebf2ff"
          }
        }
      },
      MuiFilledInput:{
        styleOverrides: {
          root:{
            color: "white", 
            backgroundColor: "#b6c7d1",
            '&:hover': {
              backgroundColor: '#9daab5', // Change hover color here
            },
            '&.Mui-focused':{
              backgroundColor: '#9daab5',
            }
          },
        }
      }
    }
  })

  return (
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <RouterProvider router={RouterPaths}/>
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App
