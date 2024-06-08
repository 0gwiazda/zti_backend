import { Container, TextField, Typography, Button } from '@mui/material'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useLogin } from '../hooks/UserHooks'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'

const Login = () => {

  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [pass, setPass] = useState("")
  const {setIsLogged} = useAuth()
  const nav = useNavigate()

  const onSubmit = async(e:any) => 
  {
    e.preventDefault()

    const token = await useLogin({email: email, password: pass})

    localStorage.setItem("token", token.token)

    const decode: any = jwtDecode(token ? token.token : "")
    
    localStorage.setItem("username", decode["sub"] ? decode["sub"] : "")
    localStorage.setItem("user_id", decode["user_id"] ? decode["user_id"] : "")

    console.log(decode);

    setIsLogged(true);
    
    nav("/")
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
                >Log in</Button>
              </Container>
            </form>

          </Container>
      </>
  )
}

export default Login
