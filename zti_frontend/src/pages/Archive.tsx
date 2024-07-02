import { useEffect, useState } from 'react'
import {useGetOffers } from '../hooks/OfferHooks'
import { Container, Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import { isOfferArchived } from '../hooks/UtilityHooks'
import OfferList from './Offers/OfferList'

const ArchivedOffers = () => {

  const [offers, setOffers] = useState([])

  const loadOffers = async() => {
    try{
      const data = await useGetOffers()
      setOffers(data)
    }
    catch(err: any){
      alert(err.message)
    }
  }

  useEffect(() => {
    loadOffers()
  }, [])

  return (
    <>
      <Navbar/>
      <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography
          variant='h3'
          sx={{marginTop: 3, marginBottom: 3}}
        >
          Archived Offers
        </Typography>
        {Object.keys(offers).length > 0 ?
          (
            <OfferList offers={offers} activation={(offer: any) => isOfferArchived(offer)} loadOffers={loadOffers} title=""/>
          ) : (
            <Typography variant="h4">
              Loading...
            </Typography>
          )}
      </Container>
    </>
  )
}

export default ArchivedOffers
