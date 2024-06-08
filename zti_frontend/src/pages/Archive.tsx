import { useEffect, useState } from 'react'
import {useGetOffers } from '../hooks/OfferHooks'
import { Typography } from '@mui/material'
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
      {Object.keys(offers).length > 0 ?
        (
          <OfferList offers={offers} activation={(offer: any) => isOfferArchived(offer)} loadOffers={loadOffers} title=""/>
        ) : (
          <Typography variant="h4">
            Loading...
          </Typography>
        )}
    </>
  )
}

export default ArchivedOffers
