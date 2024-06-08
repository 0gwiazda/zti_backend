import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetCurrentUser, useGetUser, usePutUser, useDeleteUser } from "../hooks/UserHooks"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useGetOffers } from "../hooks/OfferHooks"
import Navbar from "../components/Navbar"
import { isOfferArchived } from "../hooks/UtilityHooks"
import { useGetUserComments, usePostComment } from "../hooks/CommentHooks"
import Comment from "./Comments/Comment"
import { useAuth } from "../contexts/AuthContext"
import { useDeleteRecommend, useGetDislikes, useGetLikes, useGetRecommend, usePostRecommend, usePutRecommend } from "../hooks/RecommendHooks"
import { useGetUserOrders } from "../hooks/OrderHooks"
import Order from "./Orders/Order"
import OfferList from "./Offers/OfferList"

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
  const {isLogged, setIsLogged} = useAuth()

  const [user, setUser] = useState<IUser>({} as IUser)
  const [offers, setOffers] = useState([])
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")
  const [showEdit, setShowEdit] = useState(false)

  //parameters
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [code, setCode] = useState("")

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
      const data = await useGetCurrentUser()

      setUser(data)
      setFname(data.fname)
      setLname(data.lname)
      setAddress(data.address)
      setCity(data.city)
      setCode(data.code)
    }  
  }

  const loadOffers = async() => {

    const data = await useGetOffers()
    setOffers(data)
    
  }

  const loadUserComments = async() => {

    const data = await useGetUserComments(user.id)
    setComments(data)

  }
  const loadUserRecommends = async() => 
  {
      const Ldata = await useGetLikes(user.id)
      setLikes(Ldata)

      const Ddata = await useGetDislikes(user.id)
      setDislikes(Ddata)
  }

  const loadRecommend = async() =>{
    if(user.email !== localStorage.getItem('username') && isLogged)
    {
      const curr = await useGetCurrentUser()
      
      let data;

      try
      {
        data = await useGetRecommend(curr.id, user.id)
      }
      catch(err){
        data = {}
      }

      setRecommend(data ? data : {})
    }
  }

  const loadOrders = async() =>{
    const data = await useGetUserOrders(user.id)
    setOrders(data)
  
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

  useEffect(() => {
    if(user.id !== undefined)
    {
      loadOffers()
    }
  },[user.id])

  useEffect(() => {
    if(user.id !== undefined)
    {
      loadOffers()
    }
  },[user.id])

  useEffect(() => {
    if(user.id !== undefined)
    {
      loadOffers()
    }
  },[user.id])

  const onSubmit = async(e: any) => {
    e.preventDefault()

    const loggedUser = await useGetCurrentUser();

    const date = new Date()

    await usePostComment({userid: loggedUser.id, sellerid: user.id, text: text, dateposted: date});

    await loadUserComments()
  }

  const onSubmitUser = async(e: any) => {
    e.preventDefault()
 
    await usePutUser({fname: fname, lname: lname, address: address, city: city, code: code})

    await loadUser()

    setShowEdit(!showEdit)
  }

  return (
    <>
      <Navbar/>
        <Container sx={{display: 'flex', flexDirection: "column"}}>
          {!showEdit ? (<div>
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
            <Box>
              <Typography>
                {user.address}
              </Typography>
              <Typography>
                {user.city}
              </Typography>
              <Typography>
                {user.code}
              </Typography>
              <Box>
                <Button>
                  Edit Profile
                </Button>
                <Button>
                  Change password
                </Button>
                <Button
                  onClick={async() => {
                    const email = localStorage.getItem('username')
                    await useDeleteUser(email ? email : "");
                    localStorage.clear();
                    setIsLogged(false);
                    nav("/login")
                  }}
                >
                  Delete Profile
                </Button>
              </Box>
            </Box>}
          </div>) : (
          <form onSubmit={onSubmitUser}>
            <TextField
              value={fname}
              onChange={(e:any) => setFname(e.target.value)}
            />
            <TextField
              value={lname}
              onChange={(e:any) => setLname(e.target.value)}
            />
            <TextField
              value={address}
              onChange={(e:any) => setAddress(e.target.value)}
            />
            <TextField
              value={city}
              onChange={(e:any) => setCity(e.target.value)}
            />
            <TextField
              value={code}
              onChange={(e:any) => setCode(e.target.value)}
            />
            <Box>
              <Button
                type="submit"
              >
                Submit changes
              </Button>
            </Box>
          </form>)}
          {isLogged && user.email === localStorage.getItem('username') &&
          <Button
            onClick={() => setShowEdit(!showEdit)}
          >
            {!showEdit ? "Show" : "Close"} Edit
          </Button>
          }
          <Container>
          <OfferList offers={offers} activation={(offer:any) => !isOfferArchived(offer) && offer.sellerid === user.id} loadOffers={loadOffers} title="Offers:"/>
          </Container>
          {isLogged && user.email === localStorage.getItem('username') &&
          <Button
            onClick={() => {nav("/offerbuyauction/0")}}
          >
            Add Offer
          </Button>}
          {isLogged && user.email === localStorage.getItem('username') &&
            <>            
              <Typography>
                Orders:
              </Typography>
              <Container>
              {orders.map((order:any) => <Box sx={{display: 'block', maxWidth:'500px', justifyContent: 'center', alignItems: 'center', border: '2px solid red'}}>
                <Order id={order.id} key={order.id} {...order}/>
              </Box>)}
              </Container>
              <OfferList offers={offers} loadOffers={loadOffers} activation={(offer:any) => offer.auctionuserid === user.id} title="Current Auctions:"/>
            </>
          }
          {likes != 0 && dislikes != 0 && <>
          <Typography>
            {!showRecommend ? "Recommended by: " + ((likes / (likes + dislikes)) * 100.).toFixed(0) + "%" : "Likes: " + likes + " Dislikes: " + dislikes}
          </Typography>
          <Box>
            <Button
              onClick={() => setShowRecommend(!showRecommend)}
            >
              {!showRecommend ? "Show" : "Close"} Recommendations
            </Button>
            {isLogged && user.email !== localStorage.getItem('username') ? (<>
            <Button
              onClick={async() => {
                

                if(Object.keys(recommend).length != 0)
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
              }}
            >
              Like
            </Button>
            <Button
              onClick={async() => {
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
              }}
            >
              Dislike
            </Button></>) : (<></>)}
          </Box>
          </>}
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
