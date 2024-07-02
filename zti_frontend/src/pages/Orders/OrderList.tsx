import { Container, Typography } from '@mui/material'
import Order from './Order'

interface OrderListProps{
    orders: Array<Object>
    loadOrders: () => Promise<void>,
    title: string
}

const OrderList:React.FC<OrderListProps> = ({
    orders,
    loadOrders,
    title
}) => {

  return (
    <>
      {orders.length > 0 ? (<>
        <Typography
          sx={{marginTop: 2}}
          variant='h5'
        >
          {title}
        </Typography>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {orders.map((order:any) => {
              return <Order id={order.id} key={order.id} {...order} loadOrders={loadOrders}/>
          })}
        </Container></>) : (<></>)
        }
    </>
  )
}

export default OrderList
