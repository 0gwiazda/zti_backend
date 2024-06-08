import { Box, Button, Container, Typography} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useGetItem } from '../../hooks/ItemHooks'
import { useAuctionOffer, useBuyOffer, useDeleteOffer, useGetOffer } from '../../hooks/OfferHooks'
import { usePostOrder } from '../../hooks/OrderHooks'
import { useGetCurrentUser, useGetUser } from '../../hooks/UserHooks'
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
  const [amount, setAmount] = useState(0)
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
        setIsOwner(!isBuyer)
      }
    }
    catch(err: any){
      alert(err.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])


  const buyItem = async() => {
    if(amount <= offer.itemcount)
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
          itemid: offer.itemid,
          quantity: amount,
          buyerid: user.id
        }

        await usePostOrder(order)
      }
    }
    else{
      alert("Too much")
    }
  }

  const onAuction = async(newPrice: number) => {
    try{
      const data = await useAuctionOffer(offer.id, newPrice, {offer})
    }
    catch(err: any){
      alert(err.message)
    }
  }

  return (
    <>
    <Navbar/>
    <Container sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography
        variant='h6'
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
        {offer.auction ? (<Box>
            <Typography>
               {"Start: " + offer.startdate}
            </Typography>
            <Typography>
              {"End: " + offer.enddate}
            </Typography>
          </Box>) : (<></>)}
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
