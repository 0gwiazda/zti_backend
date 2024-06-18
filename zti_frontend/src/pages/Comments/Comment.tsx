import { Card, Button, Container, TextField, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../hooks/UserHooks'
import { useDeleteComment, usePutComment } from '../../hooks/CommentHooks'
import { useAuth } from '../../contexts/AuthContext'

interface CommentProps{
  id: number
  sellerid: number
  userid: number
  text: string
  dateposted: string
  loadComments: () => Promise<void>
}

const Comment:React.FC<CommentProps> = ({
    id,
    userid,
    sellerid,
    text,
    dateposted,
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

  const [date, setDate] = useState<Array<string>>([])

  const parseDate = () =>{
    setDate(dateposted.split("T"))
  }

  useEffect(() => {
    loadUser()
    parseDate()
  }, [])

  const onSubmit = async(e: any) => {
    e.preventDefault()
    const date = new Date()

    await usePutComment(id, {userid: userid, sellerid: sellerid, text: newText, dateposted: date})

    await loadComments()
    setShowEdit(false)
  }

  return (
    <Card sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography
        variant='h6'
      >
        {user.email}
      </Typography>
      <Container>
        <Typography>
          {date[0] + " " + date[1]}
        </Typography>
        {
          !showEdit ? 
          (<Typography>
            {text}
        </Typography>) : (<></>)
        }
      </Container>
      {isLogged && user.email === localStorage.getItem("username") && 
        <Container
          sx={{justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}
        >
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
            Edit
          </Button>
          <Button
            onClick={async() => {
              try{
                await useDeleteComment(id); 
                await loadComments()
              }
              catch(err: any)
              {
                alert(err.message)
              }
            }}
          >
            Delete
          </Button>
        </Container>
      }
    </Card>
  )
}

export default Comment
