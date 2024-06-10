import { Button, Container, FilledInput, FormGroup, FormLabel, Modal } from '@mui/material'
import React, { useState } from 'react'
import { usePutUser } from '../../hooks/UserHooks'

interface UserProps{
    fname: string
    lname: string
    address: string
    city: string
    code: string
    loadUser: () => Promise<void>
}


const ProfileEditModal:React.FC<UserProps> = ({
    fname,
    lname,
    address,
    city,
    code,
    loadUser
}) => {
    const [open, setOpen] = useState(false)
    const [newFname, setNewFname] = useState(fname)
    const [newLname, setNewLname] = useState(lname)
    const [newAddress, setNewAddress] = useState(address)
    const [newCity, setNewCity] = useState(city)
    const [newCode, setNewCode] = useState(code)

    const handleSubmit = async(e:any) => {
        e.preventDefault()

        try{
            await usePutUser({fname: newFname, lname: newLname, address: newAddress, city: newCity, code: newCode})
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
        Edit Profile
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Container sx={{display: 'flex', flexDirection: 'column', padding: "20px", position:"fixed", minWidth: "50%", minHeight: "50%", maxWidth: "1200px", maxHeight: "1400px", overflow: "auto", backgroundColor: "#eeeeee", borderRadius: "5px", top:"50%", bottom:"50%", left: '50%', right: '50%', transform: "translate(-50%, -50%)"}}>
            <form onSubmit={handleSubmit}>
                <Container>
                    <FormGroup>
                        <FormLabel htmlFor="fname">First Name:</FormLabel>
                        <FilledInput
                        type="text"
                        id="fname"
                        value={newFname}
                        onChange={(e) => setNewFname(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="lname">Last Name:</FormLabel>
                        <FilledInput
                        type="text"
                        id="lname"
                        value={newLname}
                        onChange={(e) => setNewLname(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="addr">Address:</FormLabel>
                        <FilledInput
                        type="text"
                        id="addr"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="city">City:</FormLabel>
                        <FilledInput
                        type="text"
                        id="city"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="code">Code:</FormLabel>
                        <FilledInput
                        type="text"
                        id="code"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        sx={{marginTop: 1, alignSelf: 'center'}}
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

export default ProfileEditModal
