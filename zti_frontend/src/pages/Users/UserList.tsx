import { Container, Typography } from '@mui/material'
import User from './User'

interface UserListProps{
    users: Array<Object>
    title: string
}

const UserList:React.FC<UserListProps> = ({
    users,
    title
}) => {

  users = users.filter((user: any) => user.role !== 'ADMIN')

  return (
    <>
      {users.length > 0 ? (<>
        <Typography
          sx={{marginTop: 2}}
          variant='h4'
        >
          {title}
        </Typography>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {users.map((user:any) => {
              return <User id={user.id} key={user.id} {...user}/>
          })}
        </Container></>) : (<></>)
        }
    </>
  )
}

export default UserList
