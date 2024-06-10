import { Container, Typography } from '@mui/material'
import Order from './Order'

interface OrderListProps{
    orders: Array<Object>
    activation: (order: object) => boolean
    loadOrders: () => Promise<void>,
    title: string
}

const OrderList:React.FC<OrderListProps> = ({
    orders,
    activation,
    loadOrders,
    title
}) => {

  const orderFiltered = orders.length > 0 ? orders.filter(order => activation(order)) : []

  return (
    <>
      {orderFiltered.length > 0 ? (<>
        <Typography
          sx={{marginTop: 2}}
          variant='h5'
        >
          {title}
        </Typography>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {orderFiltered.map((order:any) => {
              return <Order id={order.id} {...order} loadOrders={loadOrders}/>
          })}
        </Container></>) : (<></>)
        }
    </>
  )
}

export default OrderList
