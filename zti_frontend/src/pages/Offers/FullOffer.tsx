import { Button, Card, Container, Typography} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDeleteItem, useGetItem } from '../../hooks/ItemHooks'
import { useAuctionOffer, useBuyOffer, useDeleteOffer, useGetOffer } from '../../hooks/OfferHooks'
import { useCountOrders, usePostOrder } from '../../hooks/OrderHooks'
import { useGetCurrentUser } from '../../hooks/UserHooks'
import OfferBuyAuctionModal from './OfferBuyAuctionModal'
import { useAuth } from '../../contexts/AuthContext'
import Navbar from '../../components/Navbar'
import { getTimer } from '../../hooks/UtilityHooks'
import { useDeleteImage, useGetImage } from '../../hooks/ImageHooks'
import OfferAddImageModal from './OfferAddImageModal'


const FullOffer = () => {
  
  const {id} = useParams()
  const nav = useNavigate()
  
  interface ItemProps {
    id: number
    name: string
    description: string
    price: number
  }

  interface OfferProps{
    id: number
    itemid: number
    itemcount: number
    auction: boolean
    startdate: string
    enddate: string
    sellerid: number
    auctionuserid: number
  }

  const {isLogged, currentUserId, isAdmin} = useAuth()


  const [item, setItem] = useState<ItemProps>({} as ItemProps)
  const [offer, setOffer] = useState<OfferProps>({} as OfferProps)
  const [isBuyer, setIsBuyer] = useState(false)
  const [isOwner, setIsOwner] = useState(false) 
  const [orderCheck, setOrderCheck] = useState(false)
  const [imageCheck, setImageCheck] = useState(false)
  const [image, setImage] = useState<null | string>(null);

  const {days, hours, minutes, seconds} = getTimer(offer.enddate)

  const loadData = async() => {
    try{
      const data = await useGetOffer(parseInt(id ? id : "-1"))

      if(Object.keys(data).length > 0)
      {
        const item = await useGetItem(data.itemid)
        setItem(item)
        setOffer(data)

        const imageData = await useGetImage(data.itemid)
        if(imageData.size > 0){
          const url = URL.createObjectURL(imageData);

          setImage(url);
          setImageCheck(true)
        }
        else
        {
          setImageCheck(false)
        }
      }

      if(isLogged)
      {
        setIsBuyer(currentUserId !== data.sellerid && !isAdmin)
        setIsOwner(currentUserId === data.sellerid)
        const count = await useCountOrders(parseInt(id ? id : "0"));

        setOrderCheck(count <= 0)
      }
    }
    catch(err: any){
      alert(err.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [isLogged, id, currentUserId])



  const buyItem = async(amount: number) => {
    if(amount <= offer.itemcount)
    {
      try
      {
        const data = await useBuyOffer(offer.id, 
        {  
          itemcount: amount,
          startdate: offer.startdate,
          enddate: offer.enddate,
          auction: offer.auction,
          itemid: offer.itemid,
          sellerid: offer.sellerid
        })

        if(data)
        {
          const user = await useGetCurrentUser()

          const order ={
            offerid: offer.id,
            quantity: amount,
            buyerid: user.id
          }

          await usePostOrder(order)

          nav("/")
        }
      }
      catch(err: any){
        alert(err.message)
      }
    }
    else{
      alert("Too much")
    }
  }

  const onAuction = async(newPrice: number) => {
    try{
      await useAuctionOffer(offer.id, newPrice*100, {offer})
    }
    catch(err: any){
      alert(err.message)
    }
  }

  return (
    <>
    <Navbar/>
    <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {imageCheck ?
        (<Container
          component="img"
          src={image ? image : ""}
          sx={{width: 'auto', height: 'auto', maxWidth: 600, maxHeight: 600}}
        >
        </Container>) : (<Container>
          <Typography
            variant="h3"
            sx={{marginBottom: 5}}
          >
            Image not found
          </Typography>
        </Container>)}
      <Typography
        variant='h4'
      >
        {item.name}
      </Typography>
      <Typography
        variant='h6'
      >
        {item.description}
      </Typography>
      <Container sx={{display: 'flex', margin: '5px auto', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography>
          Quantity: {offer.itemcount}
        </Typography>
        {offer.auction ? (<Container>
            <Typography>
              {"Start: " + offer.startdate.replace("T", " ")}
            </Typography>
            <Typography>
              {"End: " + offer.enddate.replace("T", " ")}
            </Typography>
            <Typography
                variant='h6'
                color={(days < 0 && hours < 0) ? '#F00' : "#000"}>
            {(seconds > 0 || days > 0 || hours > 0 || minutes > 0) ?
              (

                `Time left: ${days != 1 ? days + " days" : days + " day"} ${hours + "h"} ${minutes + "min."} ${seconds + "s"}`
             ) : ("Auction ended")}</Typography>
          </Container>) : (<></>)}
      </Container>
      <Typography
        variant='h6'
        margin={'0 30px auto'}
      >
        Price: {item.price / 100.0}$
      </Typography>
      <Link to={`/profile/${offer.sellerid}`}>
        Seller Profile
      </Link>
      {isBuyer && ((seconds > 0 || days > 0 || hours > 0 || minutes > 0)|| !offer.auction) && offer.itemcount > 0  &&
        <OfferBuyAuctionModal OnSubmit={buyItem} price={item.price / 100.0} auction={offer.auction} OnAuction={onAuction}/>
      }
      {
        isOwner && !imageCheck &&
        <OfferAddImageModal loadOffers={async() => await loadData()} itemid={offer.itemid}/>
      }
      {isOwner && orderCheck &&
        <Button
          onClick={async()=>{
            try {
              await useDeleteOffer(offer.id); 
              await useDeleteImage(offer.itemid);
              await useDeleteItem(offer.itemid);
              nav("/")
            } 
            catch (error: any) 
            {
              alert(error.message)
            }
          }}
        >
          Delete Offer
        </Button>
      }
    </Card></>
  )
}

export default FullOffer
