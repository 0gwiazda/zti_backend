import { Container, TextField, Typography, Button } from '@mui/material'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const Login = () => {

  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [pass, setPass] = useState("")

  const onSubmit = (e:any) => 
  {
    e.preventDefault()

    
  }

  return (
    <>
      <Navbar/>
        <Container sx={{display:"flex", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
            <form className='register-form' onSubmit={onSubmit}>
              <Typography 
                variant="h3"
                marginBottom={'3%'}
                marginLeft={'13%'}
                marginTop={'3%'}
              >Zaloguj się</Typography>  
              <Container sx={{justifyContent: "center", marginLeft: 2.5}}>
                <div className='form-control'>
                  <Typography 
                    variant="subtitle1"
                    marginBottom={0.5}
                    >E-mail</Typography>
                  <TextField
                    type="email"
                    placeholder="adamkowalski@test.com" 
                    value={email}
                    error={error}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <div className='form-control'>
                  <Typography 
                      variant="subtitle1"
                      marginBottom={0.5}
                      marginTop={0.5}
                      >Hasło</Typography>
                  <TextField
                    type="password"
                    value={pass}
                    error={error}
                    onChange={(e) => setPass(e.target.value)}
                    required={true}
                  />
                </div>
                <Button 
                  type='submit' 
                  variant='outlined' 
                  sx={{color: "#fff", marginTop: '10%', marginLeft: '25%'}}
                >Zaloguj</Button>
              </Container>
            </form>

          </Container>
      </>
  )
}

export default Login
