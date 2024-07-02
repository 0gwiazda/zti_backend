import { Button, Container, FilledInput, FormGroup, FormLabel, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useChangePassword } from '../../hooks/UserHooks'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../../contexts/AuthContext'

interface UserProps{
    loadUser: () => Promise<void>
}


const ProfileChangePassModal:React.FC<UserProps> = ({
    loadUser
}) => {
    const [open, setOpen] = useState(false)
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newPassConfirm, setNewPassConfirm] = useState("")

    const {setIsLogged} = useAuth()


    const handleSubmit = async(e:any) => {
        e.preventDefault()

        try{
            if(newPassConfirm === newPass)
            {
                const token = await useChangePassword(oldPass, newPass)
                
                localStorage.setItem("token", token.token)

                const decode: any = jwtDecode(token ? token.token : "")
                
                localStorage.setItem("username", decode["sub"] ? decode["sub"] : "")
                localStorage.setItem("user_id", decode["user_id"] ? decode["user_id"] : "")
          
                console.log(decode);
          
                setIsLogged(true);
            }
            else{
                setOldPass("")
                setNewPass("")
                setNewPassConfirm("")
            }
           
            await loadUser()

            setOpen(false)
        }
        catch(err:any){
            alert(err.message)
        }
    }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{marginRight: 1}}
      >
        Change Password
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Container sx={{display: 'flex', flexDirection: 'column', padding: "20px", position:"fixed", width: "100px", minWidth: "40%", minHeight: "50%", maxWidth: "1200px", maxHeight: "1400px", overflow: "auto", backgroundColor: "#eeeeee", borderRadius: "5px", top:"50%", bottom:"50%", left: '50%', right: '50%', transform: "translate(-50%, -50%)"}}>
            <Typography
                variant="h4"
                sx={{marginBottom: 3}}
            >
                Change Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <Container>
                    <FormGroup>
                        <FormLabel htmlFor="oldPass">Old Password:</FormLabel>
                        <FilledInput
                        type="password"
                        id="oldPass"
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="newPass">New Password:</FormLabel>
                        <FilledInput
                        type="password"
                        id="newPass"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="newPassConf">Confirm Password:</FormLabel>
                        <FilledInput
                        type="password"
                        id="newPassConf"
                        value={newPassConfirm}
                        onChange={(e) => setNewPassConfirm(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        sx={{marginTop: 2, alignSelf: 'center'}}
                    >
                        Submit
                    </Button>
                </Container>
            </form>
        </Container>
      </Modal>
    </>
  )
}

export default ProfileChangePassModal
