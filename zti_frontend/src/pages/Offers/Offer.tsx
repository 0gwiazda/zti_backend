import { Card, Button, Container, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDeleteItem, useGetItem } from '../../hooks/ItemHooks'
import {useBuyAuctionOffer, useDeleteOffer } from '../../hooks/OfferHooks'
import { useCountOrders, usePostOrder } from '../../hooks/OrderHooks'
import { useAuth } from '../../contexts/AuthContext'
import { useDeleteImage, useGetImage } from '../../hooks/ImageHooks'
import OfferAddImageModal from './OfferAddImageModal'

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
  const [isOwner, setIsOwner] = useState(false)
  const [timer, setTimer] = useState(0.0)
  const [orderCheck, setOrderCheck] = useState(false)
  const [imageCheck, setImageCheck] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const end = Date.parse(enddate)

  const loadItem = async() => {
    try{
    const data = await useGetItem(itemid)
    setItem(data)
  
    const imageData = await useGetImage(data.id)
    console.log(imageData)
    if(imageData.size > 0){
      const url = URL.createObjectURL(imageData);

      setImage(url);
      setImageCheck(true)
    }
    else{
      setImageCheck(false)
    }
  }
    catch(err: any){
      alert(err.message)
    }
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
      setIsOwner(sellerid === currentUserId)

      const count = await useCountOrders(id);

      setOrderCheck(count <= 0)
    }
    else
    {
      setIsOwner(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

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
    <Card sx={{display: 'block', width: '800px', justifyContent: 'center', alignItems: 'center'}}>
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
        {imageCheck && <Container
          component="img"
          src={image ? image : ""}
          sx={{width: '50%', height: '50%', maxWidth: 800, maxHeight: 800}}
        >

        </Container>}
        <Typography
          variant='h6'
        >
          {item.name}
        </Typography>
        <Container sx={{display: 'flex', margin: '5px auto', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography>
            Quantity: {itemcount}
          </Typography>
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
            Buy Item
          </Button>
        }
        {
          isOwner && !imageCheck && (timer > 0 || (!auction && itemcount > 0)) &&
          <OfferAddImageModal loadOffers={loadOffers} itemid={itemid}/>
        }
        {isOwner && orderCheck &&
          <Button
            onClick={async()=>{
              try 
              {
                await useDeleteOffer(id); 
                await useDeleteImage(itemid);
                await useDeleteItem(itemid);
                await loadOffers()
              } 
              catch (error:any) 
              {
                alert(error.message)
              }
            }}
          >
            Delete Offer
          </Button>
        }
      </Container>
    </Card>
  )
}

export default Offer
