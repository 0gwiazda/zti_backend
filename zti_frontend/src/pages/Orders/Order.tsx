import {Card, Container, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useGetItem } from '../../hooks/ItemHooks'
import { useGetOffer } from '../../hooks/OfferHooks'

import { Link } from 'react-router-dom'

interface OrderProps{
    id: number,
    offerid: number,
    quantity: number,
    buyerid: number
}

const Order:React.FC<OrderProps> = ({
    offerid,
    quantity
}) => {
  
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
    item: ItemProps
}
  
  const [item, setItem] = useState<ItemProps>({} as ItemProps)
  const [offer, setOffer] = useState<OfferProps>({} as OfferProps)
  

  const loadData = async() => {
    try{
      const dataOffer = await useGetOffer(offerid)
      const dataItem = await useGetItem(dataOffer.itemid)
      
      setOffer(dataOffer)
      setItem(dataItem)
    }
    catch(err: any)
    {
      alert(err.message)
    }
  }


  useEffect(() => {
    loadData()
  }, [])


  return (
    <Card sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography
        variant='h6'
      >
        {item.name}
      </Typography>
      <Container>
        <Typography>
            Quantity: {quantity}
        </Typography>
        <Typography>
            {"Bought for: " + (item.price / 100.0) * quantity + "$"}
        </Typography>
      </Container>
      <Link to={`/offer/${offer.id}`}>
          Offer
      </Link>
      <Link to={`/profile/${offer.sellerid}`}>
          Seller Profile
      </Link>
    </Card>
  )
}

export default Order
