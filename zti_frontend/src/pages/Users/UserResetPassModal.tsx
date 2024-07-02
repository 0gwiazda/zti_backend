import { Button, Container, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useResetPassword } from '../../hooks/UserHooks'

import { useAuth } from '../../contexts/AuthContext'

interface ResetProps{
    id: number,
    email: string
}



const UserResetPassModal:React.FC<ResetProps> = ({id, email}) => {

    const [open, setOpen] = useState(false)
    const [pass, setPass] = useState("")

    const {isAdmin} = useAuth()


    const handleSubmit = async(e:any) => {
        e.preventDefault()

        try{
            if(isAdmin) {
                const res = await useResetPassword(id)
                setPass(res.password)
            }

            setOpen(true)
        }
        catch(err:any){
            alert(err.message)
        }
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Button
            type="submit"
            sx={{marginRight: 1}}
        >
            Reset Password
        </Button>
      </form>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Container sx={{display: 'flex', flexDirection: 'column', padding: "20px", position:"fixed", width: "100px", minWidth: "40%", minHeight: "50%", maxWidth: "1200px", maxHeight: "1400px", overflow: "auto", backgroundColor: "#eeeeee", borderRadius: "5px", top:"50%", bottom:"50%", left: '50%', right: '50%', transform: "translate(-50%, -50%)"}}>
            <Typography
                variant="h4"
                sx={{marginBottom: 3}}
            >
                New Password: {pass}
            </Typography>
            <Typography
                variant="h4"
                sx={{marginBottom: 3}}
            >
                For User: {email}
            </Typography>
            <Button
                onClick={() => setOpen(false)}
            >
                Close
            </Button>
        </Container>
      </Modal>
    </>
  )
}

export default UserResetPassModal
