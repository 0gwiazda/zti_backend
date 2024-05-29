import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetCurrentUser, useGetUser } from "../hooks/UserHooks"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useGetUsersOffers } from "../hooks/OfferHooks"
import Offer from "./Offers/Offer"
import Navbar from "../components/Navbar"
import { useGetUserComments, usePostComment, useDeleteComment } from "../hooks/CommentHooks"
import Comment from "./Comments/Comment"
import { useAuth } from "../contexts/AuthContext"

interface IUser
{
  id: number,
  fname: string,
  lname: string,
  email: string,
}


const Profile = () => {
  const {id} = useParams()
  const {isLogged} = useAuth()

  const [user, setUser] = useState<IUser>({} as IUser)
  const [offers, setOffers] = useState([])
  const [comments, setComments] = useState([])
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")

  const loadUser = async() => {
    if(id){
      const data = await useGetUser(parseInt(id))
      setUser(data)
    }
    else
    {
      const data = await useGetCurrentUser()

      setUser(data)
    }  
  }

  const loadUserOffers = async() => {
    if(id){
      const data = await useGetUsersOffers(parseInt(id))
      setOffers(data)
      console.log("up")
    } 
    else
    {
      const data = await useGetUsersOffers(user !== undefined ? user.id : 0)
      setOffers(data)
    } 
  }

  const loadUserComments = async() => {
    if(id)
    {
      const data = await useGetUserComments(parseInt(id))
      setComments(data)
      console.log("up")
    }
    else
    {
      const data = await useGetUserComments(user ? user.id : 0)
      setComments(data)
    }   
}

  useEffect(() => {
    loadUser()
  }, [id])

  useEffect(() => {
    loadUserOffers()
  }, [user])

  useEffect(()=>{
    loadUserComments()
  }, [user])

  const onSubmit = async(e: any) => {
    e.preventDefault()

    const loggedUser = await useGetCurrentUser();


    const date = new Date()

    await usePostComment({userid: loggedUser.id, sellerid: user.id, text: text, dateposted: date});

    await loadUserComments()
  }

  return (
    <>
      <Navbar/>
        <Container sx={{display: 'flex', flexDirection: "column"}}>
          <div>
            <Typography
              variant="h5"
            >
              {user.fname + " " + user.lname}    
            </Typography>
            <Typography
            >
              {user.email}
            </Typography>
          </div>
          <Typography>
            Offers:
          </Typography>
          <Container>
          {offers.map((offer:any) => <Box sx={{display: 'block', maxWidth:'500px', justifyContent: 'center', alignItems: 'center', border: '2px solid red'}}>
            <Offer id={offer.id} {...offer} />
            </Box>)}
          </Container>
          <Typography>
            Comments: 
          </Typography>
          <Container>
            {comments.map((comment:any) => <Box sx={{display: 'block', maxWidth:'500px', justifyContent: 'center', alignItems: 'center', border: '2px solid red'}}>
              <Comment id={comment.id} loadComments={loadUserComments} {...comment}/>
            </Box> 
            )}
            {user.email !== localStorage.getItem("username") && isLogged &&
            <form onSubmit={onSubmit}>
              <TextField
                type="text"
                placeholder="Input comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                type="submit"
              >
                Add comment
              </Button>
            </form>
          }
          </Container>
        </Container>
    </>
  )
}

export default Profile
