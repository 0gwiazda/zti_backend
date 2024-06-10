import { Button, Container, Typography} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetItem } from '../../hooks/ItemHooks'
import { useAuctionOffer, useBuyOffer, useDeleteOffer, useGetOffer } from '../../hooks/OfferHooks'
import { usePostOrder } from '../../hooks/OrderHooks'
import { useGetCurrentUser } from '../../hooks/UserHooks'
import OfferBuyAuctionModal from './OfferBuyAuctionModal'
import { useAuth } from '../../contexts/AuthContext'
import Navbar from '../../components/Navbar'


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

  const {isLogged, currentUserId} = useAuth()

  const [item, setItem] = useState<ItemProps>({} as ItemProps)
  const [offer, setOffer] = useState<OfferProps>({} as OfferProps)
  const [isBuyer, setIsBuyer] = useState(false)
  const [isOwner, setIsOwner] = useState(false) 

  const loadData = async() => {
    try{
      const data = await useGetOffer(parseInt(id ? id : "-1"))

      if(Object.keys(data).length > 0)
      {
        const item = await useGetItem(data.itemid)

        setItem(item)
        setOffer(data)
      }

      if(isLogged)
      {
        setIsBuyer(currentUserId !== data.sellerid)
        setIsOwner(currentUserId === data.sellerid)
      }
    }
    catch(err: any){
      alert(err.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [isLogged])


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
      await useAuctionOffer(offer.id, newPrice, {offer})
    }
    catch(err: any){
      alert(err.message)
    }
  }

  return (
    <>
    <Navbar/>
    <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Typography
        variant='h4'
      >
        {item.name}
      </Typography>
      <Typography>
        {item.description}
      </Typography>
      <Container sx={{display: 'flex', margin: '5px auto', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography>
          Quantity: {offer.itemcount}
        </Typography>
        {offer.auction ? (<Container>
            <Typography>
               {"Start: " + offer.startdate}
            </Typography>
            <Typography>
              {"End: " + offer.enddate}
            </Typography>
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
      {isBuyer &&
        <OfferBuyAuctionModal OnSubmit={buyItem} price={item.price / 100.0} auction={offer.auction} OnAuction={onAuction}/>
      }
      {isOwner &&
        <Button
          onClick={async()=>{await useDeleteOffer(offer.id); nav("/")}}
        >
          Delete Offer
        </Button>
      }
    </Container></>
  )
}

export default FullOffer
