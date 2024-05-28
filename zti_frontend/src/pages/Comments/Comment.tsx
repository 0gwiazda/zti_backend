import { Box, Container, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../hooks/UserHooks'

interface CommentProps{
  id: string
  sellerid: number
  userid: number
  text: boolean
}

const Comment:React.FC<CommentProps> = ({
    sellerid,
    text
}) => {
  
  interface UserProps {
    id: number
    fname: string
    lname: string
    email: string
  }

  const [user, setUser] = useState<UserProps>({} as UserProps)

  const loadItem = async() => {
    const data = await useGetUser(sellerid)
    setUser(data)
  }

  useEffect(() => {
    loadItem()
  }, [])

  return (
    <Container sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography
        variant='h6'
      >
        {user.email}
      </Typography>
      <Box>
        <Typography>
            {text}
        </Typography>
      </Box>
    </Container>
  )
}

export default Comment
