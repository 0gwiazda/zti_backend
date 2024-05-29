import React, { useEffect, useState } from 'react'
import { useGetOffers } from '../hooks/OfferHooks'
import { Box, Container } from '@mui/material'
import Offer from './Offers/Offer'
import Navbar from '../components/Navbar'

const Home = () => {

  const [offers, setOffers] = useState([])

  const loadOffers = async() => {
    const data = await useGetOffers()
    setOffers(data)
  }

  useEffect(() => {
    loadOffers()
  }, [])

  return (
    <>
      <Navbar/>
        <Container sx={{alignItems: 'center', justifyContent: 'center'}}>
          {offers.map((offer:any) => <Box sx={{display: 'block', maxWidth:'500px', justifyContent: 'center', alignItems: 'center', border: '2px solid red'}}>
            <Offer profile="enabled" id={offer.id} {...offer}/>
            </Box>)}
        </Container>
    </>
  )
}

export default Home
