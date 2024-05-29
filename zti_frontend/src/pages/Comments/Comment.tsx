import { Box, Button, Container, TextField, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../hooks/UserHooks'
import { useDeleteComment, usePutComment } from '../../hooks/CommentHooks'
import { useAuth } from '../../contexts/AuthContext'

interface CommentProps{
  id: number
  sellerid: number
  userid: number
  text: string
  date: string
  loadComments: () => void
}

const Comment:React.FC<CommentProps> = ({
    id,
    userid,
    sellerid,
    text,
    date,
    loadComments
}) => {
  
  interface UserProps {
    id: number
    fname: string
    lname: string
    email: string
  }

  const {isLogged} = useAuth()

  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [newText, setNewText] = useState(text)
  const [showEdit, setShowEdit] = useState(false)

  const loadUser = async() => {
    const data = await useGetUser(userid)
    setUser(data)
  }

  useEffect(() => {
    loadUser()
  }, [])

  const onSubmit = async(e: any) => {
    e.preventDefault()
    const date = new Date()

    await usePutComment(id, {userid: userid, sellerid: sellerid, text: newText, date: date})

    await loadComments()
    setShowEdit(false)
  }

  return (
    <Container sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography
        variant='h6'
      >
        {user.email}
      </Typography>
      <Box>
        {
          !showEdit ? 
          (<Typography>
            {text}
        </Typography>) : (<></>)
        }

      </Box>
      {isLogged && user.email === localStorage.getItem("username") && 
        <>
          {showEdit && 
            <form onSubmit={onSubmit}>
              <TextField
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
              />
              <Button
                type="submit"
              >
                Submit
              </Button>
            </form>
          }
          <Button
            onClick={()=>setShowEdit(!showEdit)}
          >
            Edit comment
          </Button>
          <Button
            onClick={async() => {await useDeleteComment(id); await loadComments()}}
          >
            Delete comment
          </Button>
        </>
      }
    </Container>
  )
}

export default Comment
