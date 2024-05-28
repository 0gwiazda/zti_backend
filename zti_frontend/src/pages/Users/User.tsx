import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const user: Object = useParams()

  return (
    <div>
      {user.fname + " " + user.lname}
    </div>
  )
}

export default User
