import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetUser } from "../hooks/UserHooks"
import { Box, Container, Typography } from "@mui/material"
import { useGetUsersOffers } from "../hooks/OfferHooks"
import Offer from "./Offers/Offer"
import Navbar from "../components/Navbar"
import { useGetSellerComments } from "../hooks/CommentHooks"
import Comment from "./Comments/Comment"

interface IUser
{
  id: number,
  fname: string,
  lname: string,
  email: string,
}


const Profile = () => {
  const {id} = useParams()

  const [user, setUser] = useState<IUser>({} as IUser)
  const [offers, setOffers] = useState([])
  const [comments, setComments] = useState([])

  const loadUser = async() => {
    if(id){
      const data = await useGetUser(parseInt(id))
      setUser(data)
    }  
  }

  const loadUserOffers = async() => {
    if(id){
      const data = await useGetUsersOffers(parseInt(id))
      setOffers(data)
    }  
  }

  const loadUserComments = async() => {
    if(id)
    {
      const data = await useGetSellerComments(parseInt(id))
      setComments(data)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  useEffect(() => {
    loadUserOffers()
  }, [])

  useEffect(() => {
    loadUserComments()
  }, [])

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
              <Comment id={comment.id} {...comment} />
            </Box> 
            )}
          </Container>
        </Container>
    </>
  )
}

export default Profile
