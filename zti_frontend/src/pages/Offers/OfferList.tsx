import { Container, Typography } from '@mui/material'
import Offer from './Offer'

interface OfferListProps{
    offers: Array<Object>
    activation: (offer: object) => boolean
    loadOffers: () => Promise<void>,
    title: string
}

const OfferList:React.FC<OfferListProps> = ({
    offers,
    activation,
    loadOffers,
    title
}) => {

  const offerFiltered = offers.filter(offer => activation(offer))

  return (
    <>
      {offerFiltered.length > 0 ? (<>
        <Typography
          sx={{marginTop: 2}}
          variant='h5'
        >
          {title}
        </Typography>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {offerFiltered.map((offer:any) => {
              return <Offer id={offer.id} key={offer.id} {...offer} loadOffers={loadOffers}/>
          })}
        </Container></>) : (<></>)
        }
    </>
  )
}

export default OfferList
