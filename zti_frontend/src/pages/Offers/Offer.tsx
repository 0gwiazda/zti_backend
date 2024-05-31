import { Container, Typography} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useGetItem } from '../../hooks/ItemHooks'

interface OfferProps{
  id: string
  itemid: number
  itemcount: number
  auction: boolean
  startdate: string
  enddate: string
  sellerid: number
  email: string
}

const Offer:React.FC<OfferProps> = ({
  itemcount,
  startdate,
  enddate,
  auction,
  itemid,
  sellerid,
  email
}) => {
  
  interface ItemProps {
    id: number
    name: string
    description: string
    price: number
  }

  const [item, setItem] = useState<ItemProps>({} as ItemProps)

  const loadItem = async() => {
    const data = await useGetItem(itemid)
    setItem(data)
  }

  useEffect(() => {
    loadItem()
  }, [])

  const {id} = useParams()

  return (
    <Container sx={{display: 'flex', align: 'center'}}>
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
          {auction ? ("Start: " + startdate): ("")}
        </Typography>
        <Typography>
          {auction ? ("End: " + enddate): ("")}
        </Typography>
      </Container>
      <Typography
        variant='h6'
        margin={'0 30px auto'}
      >
        {item.price / 100.0}$
      </Typography>
      {!id && email !== localStorage.getItem('username') &&
        <Link to={`/profile/${sellerid}`}>
          Seller Profile
        </Link>
      }
    </Container>
  )
}

export default Offer
