import {Card, Container, Typography} from '@mui/material'
import UserResetPassModal from './UserResetPassModal'
import React from 'react'

interface UserProps{
    id: number,
    fname: string,
    lname: string,
    email: string,
    role:string
}

const User:React.FC<UserProps> = ({
    id,
    fname,
    lname,
    email,
}) => {
  



  return (
    <Card sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography
        variant='h5'
      >
        {fname + " " + lname}
      </Typography>
      <Container>
        <Typography
            variant='h6'
        >
            {email}
        </Typography>
        <UserResetPassModal id={id} email={email}/>
      </Container>
    </Card>
  )
}

export default User
