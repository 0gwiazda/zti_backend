import { useState } from 'react'
import { Container, TextField, Typography, Button } from '@mui/material'
import  Navbar from '../components/Navbar.tsx'
import { useRegister } from '../hooks/UserHooks'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [email, setEmail] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [addr, setAddr] = useState("")
  const [city, setCity] = useState("")
  const [code, setCode] = useState("")
  const [pass, setPass] = useState("")
  const [passConfirm, setPassConfirm] = useState("")
  const [error, setError] = useState(false)
  const nav = useNavigate()


  const onSubmit = async(e: any) => {
    e.preventDefault()


    if(pass === passConfirm) {

      await useRegister({
        fname: fname,
        lname: lname,
        email: email,
        password: pass,
        address: addr,
        city: city,
        code: code
      });

      nav("/login")
    }
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
      >Zarejestruj się</Typography>  
      <Container sx={{justifyContent: "center", marginLeft: 2.5}}>
      <div className='form-control'>
          <Typography 
            variant="subtitle1"
            marginBottom={0.5}
            >First Name</Typography>
          <TextField
            type="text"
            placeholder="First Name" 
            value={fname}
            error={error}
            onChange={(e) => setFname(e.target.value)}
            required={true}
          />
        </div>
        <div className='form-control'>
          <Typography 
            variant="subtitle1"
            marginBottom={0.5}
            >Last Name</Typography>
          <TextField
            type="text"
            placeholder="Last Name" 
            value={lname}
            error={error}
            onChange={(e) => setLname(e.target.value)}
            required={true}
          />
        </div>
        <div className='form-control'>
          <Typography 
            variant="subtitle1"
            marginBottom={0.5}
            >E-mail</Typography>
          <TextField
            type="email"
            placeholder="email@test.com" 
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
            >Address</Typography>
          <TextField
            type="text"
            placeholder="Address" 
            value={addr}
            error={error}
            onChange={(e) => setAddr(e.target.value)}
            required={true}
          />
        </div>
        <div className='form-control'>
          <Typography 
            variant="subtitle1"
            marginBottom={0.5}
            >City</Typography>
          <TextField
            type="text"
            placeholder="City" 
            value={city}
            error={error}
            onChange={(e) => setCity(e.target.value)}
            required={true}
          />
        </div>
        <div className='form-control'>
          <Typography 
            variant="subtitle1"
            marginBottom={0.5}
            >Code</Typography>
          <TextField
            type="text"
            placeholder="12-345" 
            value={code}
            error={error}
            onChange={(e) => setCode(e.target.value)}
            required={true}
          />
        </div>
        <div className='form-control'>
          <Typography 
              variant="subtitle1"
              marginBottom={0.5}
              marginTop={0.5}
              >Password</Typography>
          <TextField
            type="password"
            value={pass}
            error={error}
            onChange={(e) => setPass(e.target.value)}
            required={true}
          />
        </div>
        <div className='form-control'>
          <Typography 
              variant="subtitle1"
              marginBottom={0.5}
              marginTop={0.5}
              >Repeat password</Typography>
          <TextField
            type="password"
            value={passConfirm}
            error={error}
            onChange={(e) => setPassConfirm(e.target.value)}
            required={true}
          />
        </div>
        <Button 
          type='submit' 
          variant='outlined' 
          sx={{color: "#fff", marginTop: '10%', marginLeft: '25%'}}
        >Sign in</Button>
      </Container>
      </form>
    </Container>
  </>)
}

export default Register
