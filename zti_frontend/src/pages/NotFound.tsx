import React from 'react'
import Navbar from '../components/Navbar'
import { Container, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <Typography
            sx={{marginTop: 5}}
            variant='h3'
        >
            Page not Found
        </Typography>
      </Container>
    </>
  )
}

export default NotFound
