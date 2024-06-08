import { Box, Button, Container, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useGetItem } from '../../hooks/ItemHooks'
import { useAuctionOffer, useBuyAuctionOffer, useBuyOffer, useDeleteOffer } from '../../hooks/OfferHooks'
import { usePostOrder } from '../../hooks/OrderHooks'
import { useGetCurrentUser, useGetUser } from '../../hooks/UserHooks'
import OfferBuyAuctionModal from './OfferBuyAuctionModal'
import { useAuth } from '../../contexts/AuthContext'

interface OfferProps{
  id: number
  itemid: number
  itemcount: number
  auction: boolean
  startdate: string
  enddate: string
  sellerid: number
  auctionuserid: number
  loadOffers: () => Promise<void>,
}

const Offer:React.FC<OfferProps> = ({
  id,
  itemcount,
  startdate,
  enddate,
  auction,
  itemid,
  sellerid,
  auctionuserid,
  loadOffers,
}) => {
  
  interface ItemProps {
    id: number
    name: string
    description: string
    price: number
  }

  const {isLogged, currentUserId} = useAuth()

  const [item, setItem] = useState<ItemProps>({} as ItemProps)
  const [isBuyer, setIsBuyer] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [timer, setTimer] = useState(0.0)

  const end = Date.parse(enddate)

  const loadItem = async() => {
    const data = await useGetItem(itemid)
    setItem(data)
  }

  useEffect(() => {
    loadItem()
  }, [])

  useEffect(() => {
    if(auction){
      const today = Date.now()
      const time: number = end - today

      setTimer(time)
    }
    else{
      setTimer(1)
    }
  }, [auction])

  const loadUser = async() => {
    if(isLogged)
    {
      setIsBuyer(sellerid !== currentUserId)
      setIsOwner(sellerid === currentUserId)
    }
    else
    {
      setIsBuyer(false)
      setIsOwner(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const buyItem = async(amount: number) => {
    if(amount <= itemcount)
    {
      const data = await useBuyOffer(id, 
      {  
        itemcount: amount,
        startdate: startdate,
        enddate: enddate,
        auction: auction,
        itemid: itemid,
        sellerid: sellerid
      })

      if(data)
      {

        const order ={
          offerid: id,
          quantity: amount,
          buyerid: currentUserId
        }

        await usePostOrder(order)


        await loadOffers()
      }
    }
    else{
      alert("Too much")
    }
  }

  const onAuction = async(newPrice: number) => {
    try{
      const data = await useAuctionOffer(id, newPrice, {itemcount, startdate, enddate, auction, itemid, sellerid})

      await loadOffers()
    }
    catch(err: any){
      alert(err.message)
    }
  }

  const buyAuction = async() => {
    try{
      const offer = {
        itemid: itemid,
        itemcount: 0,
        auction: auction,
        startdate: startdate,
        enddate: enddate,
        sellerid: sellerid,
        auctionuserid: 0,
      }
      const data = await useBuyAuctionOffer(id, offer)

      const order = {
        offerid: id,
        quantity: itemcount,
        buyerid: currentUserId
      }


      if(data)
      {
        await usePostOrder(order)
      }

      await loadOffers()
    }
    catch(err: any){
      alert(err.message)
    }
  }

  return (
    <Box sx={{display: 'block', width: '800px', justifyContent: 'center', alignItems: 'center', border: '2px solid red'}}>
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Typography
          variant='h6'
        >
          {item.name}
        </Typography>
        <Container sx={{display: 'flex', margin: '5px auto', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography>
            Quantity: {itemcount}
          </Typography>
          {/* {auction ? (<Box>
            <Typography>
               {"Start: " + startdate}
            </Typography>
            <Typography>
              {"End: " + enddate}
            </Typography>
          </Box>) : (<></>)} */}
          <Typography>
            {auction ? "Auction" : "Offer"}
          </Typography>
          <Typography
          variant='h6'
          margin={'0 30px auto'}
        >
          {!auction ? "Price: " : "Current price: "}{item.price / 100.0}$
        </Typography>
        </Container>
        <Link to={`/offer/${id}`}>
          View Offer
        </Link>
        {
          timer < 0 && auctionuserid === currentUserId &&
          <Button
            onClick={()=>{buyAuction()}}
          >
            Buy Item {auctionuserid + "  " + currentUserId}
          </Button>
        }
        {isOwner &&
          <Button
            onClick={async()=>{await useDeleteOffer(id); await loadOffers()}}
          >
            Delete Offer
          </Button>
        }
      </Container>
    </Box>
  )
}

export default Offer
