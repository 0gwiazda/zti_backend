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
  return (
    <>
        <Typography>
          {title}
        </Typography>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {offers.map((offer:any) => {
              const activate = activation(offer)
              if(activate){
                return <Offer id={offer.id} {...offer} loadOffers={loadOffers}/>}
              
              return <></>
          })}
        </Container>
    </>
  )
}

export default OfferList
