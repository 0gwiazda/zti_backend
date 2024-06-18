import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetCurrentUser, useGetUser, useDeleteUser } from "../../hooks/UserHooks"
import { Button, Container, TextField, Typography } from "@mui/material"
import { useGetOffers } from "../../hooks/OfferHooks"
import Navbar from "../../components/Navbar"
import { isOfferArchived } from "../../hooks/UtilityHooks"
import { useGetUserComments, usePostComment } from "../../hooks/CommentHooks"
import { useAuth } from "../../contexts/AuthContext"
import { useDeleteRecommend, useGetDislikes, useGetLikes, useGetRecommend, usePostRecommend, usePutRecommend } from "../../hooks/RecommendHooks"
import { useGetUserOrders } from "../../hooks/OrderHooks"
import OfferList from "../Offers/OfferList"
import ProfileEditModal from "./ProfileEditModal"
import CommentList from "../Comments/CommentList"
import OrderList from "../Orders/OrderList"
import OfferFormModal from "../Offers/OfferFormModal"
import ProfileChangePassModal from "./ProfileChangePassModal"

interface IUser
{
  id: number,
  fname: string,
  lname: string,
  email: string,
  address: string,
  city: string,
  code: string,
}

interface IRecommend
{
  id: number,
  userid: number,
  sellerid: number,
  liked: boolean
}


const Profile = () => {
  const {id} = useParams()
  const {isLogged, setIsLogged, isAdmin, currentUserId} = useAuth()

  const [user, setUser] = useState<IUser>({} as IUser)
  const [offers, setOffers] = useState([])
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")

  //recommends
  const [showRecommend, setShowRecommend] = useState(false)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [recommend, setRecommend] = useState<IRecommend>({} as IRecommend)

  //orders
  const [orders, setOrders] = useState([])

  const nav = useNavigate()

  const loadUser = async() => {
    if(id !== undefined){
      try{
        const data = await useGetUser(parseInt(id))
        setUser(data)
      }
      catch(e: any){
        alert(e.message)
      }
    }
    else
    {
      try{
        const data = await useGetCurrentUser()

        setUser(data)
      }
      catch(err: any){
        alert(err.message)
      }
    }  
  }

  const loadOffers = async() => {
    try{
      const data = await useGetOffers()
      setOffers(data)
    }
    catch(err: any){
      alert(err.message)
    }
  }

  const loadUserComments = async() => {
    try{
      const data = await useGetUserComments(user.id)
      setComments(data)
    }
    catch(err:any){
      alert(err.message)
    }
  }
  const loadUserRecommends = async() => 
  {
    try{
      const Ldata = await useGetLikes(user.id)
      setLikes(Ldata)

      const Ddata = await useGetDislikes(user.id)
      setDislikes(Ddata)
    }
    catch(err: any){
      alert(err.message)
    }
  }

  const loadRecommend = async() =>{
    if(user.email !== localStorage.getItem('username') && isLogged)
    {
      try
      {
        let data;

        data = await useGetRecommend(currentUserId, user.id)

        setRecommend(data ? data : {})
      }
      catch(err: any){
        alert(err.message)
      }
    }
  }

  const loadOrders = async() =>{
    try{    
      if(user.email === localStorage.getItem('username') && isLogged)
      {
        const data = await useGetUserOrders(user.id)
        setOrders(data)
      }
    }
    catch(err:any){alert(err.message)}
  }

  useEffect(() => {
    loadUser()
  }, [id])

  useEffect(() => {
    if(user.id !== undefined)
    {
      loadOffers()
      loadUserComments()
      loadUserRecommends()
      loadRecommend()
      loadOrders()
    }
  },[user.id])

  const onSubmit = async(e: any) => {
    e.preventDefault()

    try{
      const date = new Date()

      await usePostComment({userid: currentUserId, sellerid: user.id, text: text, dateposted: date});

      await loadUserComments()
    }
    catch(err: any){
      alert(err.message)
    }
  }

  return (
    <>
      <Navbar/>
        <Container sx={{marginTop: 3, backgroundColor: "#fff"}}>
          <Container>
            <Typography
              variant="h4"
            >
              {user.fname + " " + user.lname}    
            </Typography>
            <Typography
              variant="h6"
            >
              {user.email}
            </Typography>
            {isLogged && user.email === localStorage.getItem('username') &&
            <Container>
              <Typography
              >
                Address: {user.address}
              </Typography>
              <Typography>
                City: {user.city}
              </Typography>
              <Typography>
                Code: {user.code}
              </Typography>
              <Container sx={{flexDirection: "row"}}>
                <ProfileChangePassModal loadUser={loadUser}/>
                {!isAdmin && <>
                <ProfileEditModal loadUser={loadUser} {...user}/>
                <Button 
                  onClick={async() => {
                    try{
                      const email = localStorage.getItem('username')
                      await useDeleteUser(email ? email : "");
                      localStorage.clear();
                      setIsLogged(false);
                      nav("/login")
                    }
                    catch(err: any){
                      alert(err.message);
                    }
                  }}
                  
                >
                  Delete Profile
                </Button></>}
              </Container>
            </Container>}
          </Container>
          <Container>
          <OfferList offers={offers} activation={(offer:any) => !isOfferArchived(offer) && offer.sellerid === user.id} loadOffers={loadOffers} title="Current Offers:"/>
          </Container>
          <Container>
          <OfferList offers={offers} activation={(offer:any) => isOfferArchived(offer) && offer.sellerid === user.id} loadOffers={loadOffers} title="Archived Offers:"/>
          </Container>
          {isLogged && user.email === localStorage.getItem('username') &&
          <OfferFormModal loadOffers={loadOffers}/>
          }
          {isLogged && user.email === localStorage.getItem('username') &&
            <>            
              <Container>
              <OfferList offers={offers} loadOffers={loadOffers} activation={(offer:any) => offer.auctionuserid === user.id} title="Current Auctions:"/>
              <OrderList orders={orders} loadOrders={loadOrders} title="Orders:"/>
              </Container>
            </>
          }
          {(!isAdmin || user.email !== localStorage.getItem('username')) && (likes != 0 || dislikes != 0 ? (<>
          <Typography>
            {!showRecommend ? "Recommended by: " + ((likes / (likes + dislikes)) * 100.).toFixed(0) + "%" : "Likes: " + likes + " Dislikes: " + dislikes}
          </Typography></>) : (<Typography>Not rated by any user</Typography>))}
          <Container sx={{flexDirection: "row", justifyContent: "space-evenly", minWidth: 500, width: 250}}>
            {(likes != 0 || dislikes != 0) && 
            <Button
              onClick={() => setShowRecommend(!showRecommend)}
            >
              {!showRecommend ? "Expand" : "Collapse"}
            </Button>}
            {isLogged && !isAdmin && user.email !== localStorage.getItem('username') ? (<>
            <Button
              onClick={async() => {
                try{
                  if(Object.keys(recommend).length > 0)
                  {
                    if(recommend.liked)
                    {
                      await useDeleteRecommend(recommend.id)
                    }
                    else
                    {
                      await usePutRecommend(recommend.id, {userid: recommend.userid, sellerid: recommend.sellerid, liked: true})
                    }
                  }
                  else
                  {
                    const logged = await useGetCurrentUser()

                    await usePostRecommend({userid: logged.id, sellerid: user.id, liked: true})
                  }

                  await loadUserRecommends()
                  await loadRecommend()
                }
                catch(err: any)
                {
                  alert(err.message)
                }
            }}
            >
              Like
            </Button>
            <Button
              onClick={async() => {
                try{
                  if(Object.keys(recommend).length != 0)
                  {
                    if(!recommend.liked)
                    {
                      await useDeleteRecommend(recommend.id)
                    }
                    else
                    {
                      await usePutRecommend(recommend.id, {userid: recommend.userid, sellerid: recommend.sellerid, liked: false})
                    }
                  }
                  else
                  {
                    const logged = await useGetCurrentUser()

                    await usePostRecommend({userid: logged.id, sellerid: user.id, liked: false})
                  }

                  await loadUserRecommends()
                  await loadRecommend()
                }
                catch(err: any){
                  alert(err.message)
                }
              }}
            >
              Dislike
            </Button></>) : (<></>)}
          </Container>
          <Container>
            <CommentList comments={comments} loadComments={loadUserComments} title="Comments:"/>
            {user.email !== localStorage.getItem("username") && isLogged && !isAdmin &&
            <form onSubmit={onSubmit}>
              <Container>
                <TextField
                  type="text"
                  placeholder="Input comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  sx={{marginTop: 1}}
                  type="submit"
                >
                  Add comment
                </Button>
              </Container>
            </form>
          }
          </Container>
        </Container>
    </>
  )
}

export default Profile
