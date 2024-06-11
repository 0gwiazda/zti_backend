import { Button, Container, FilledInput, FormGroup, FormLabel, Modal, Stack, Typography } from "@mui/material"
import React, { useState } from "react"
import { Checkbox } from "@mui/material"
import {  usePostItem } from "../../hooks/ItemHooks"
import {  usePostOffer } from "../../hooks/OfferHooks"
import { useAuth } from "../../contexts/AuthContext"


interface FormProps{
    loadOffers: () => Promise<void>;
}


const OfferFormModal:React.FC<FormProps> = ({
    loadOffers,
}) => {
    const {currentUserId} = useAuth()

    //Modal
    const [open, setOpen] = useState(false)

    //Item
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)

    //Offer
    const [count, setCount] = useState(0)
    const [auction, setAuction] = useState(false)
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
  
    const onSubmit = async(e:any) => { 
        e.preventDefault()

        try{
            const itemData = {
                name: name,
                description: desc,
                price: price*100,
            }

            const item = await usePostItem(itemData);

            if(item)
            {
                const offerData = {
                    itemid: item.id,
                    itemcount: count,
                    auction: auction,
                    startdate: start,
                    enddate: end,
                    sellerid: currentUserId
                }

                await usePostOffer(offerData)
                await loadOffers()

                setOpen(false)
            }
        }
        catch(err: any){
            alert(err.message)
        }
    }

    return (
    <>
        <Button 
            onClick={() => setOpen(true)}
        >
            Add Offer
        </Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Stack sx={{display: 'flex', flexDirection: 'column', padding: "20px", position:"fixed", minWidth: "50%", minHeight: "50%", maxWidth: "1200px", maxHeight: "1400px", overflow: "auto", backgroundColor: "#eeeeee", borderRadius: "5px", top:"50%", bottom:"50%", left: '50%', right: '50%', transform: "translate(-50%, -50%)"}}>
                <Container>
                <Typography
                    variant='h5'>
                    Add Offer    
                </Typography>
                <form onSubmit={onSubmit}>
                    <Container>
                    <FormGroup>
                        <FormLabel htmlFor="name">Item Name:</FormLabel>
                        <FilledInput
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="desc">Item Description:</FormLabel>
                        <FilledInput
                        type="text"
                        id="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="price">Item Price:</FormLabel>
                        <FilledInput
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="count">Item Count:</FormLabel>
                        <FilledInput
                        type="number"
                        id="count"
                        value={count}
                        onChange={(e) => setCount(Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}
                        required
                        />
                    </FormGroup>
                    <Typography
                        sx={{marginTop: 2}}
                    >
                        Is Auction?
                    </Typography>
                    <Checkbox
                        checked={auction}
                        disableRipple={true}
                        onChange={() => {setAuction(!auction)}}
                    />
                    {auction && <>
                        <FormGroup>
                            <FormLabel htmlFor="start">Start Date:</FormLabel>
                            <FilledInput
                            type="datetime-local"
                            id="start"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="end">End Date:</FormLabel>
                            <FilledInput
                                type="datetime-local"
                                id="end"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                required
                            />
                        </FormGroup>
                        </>
                    }
                    <Button 
                        type="submit"
                        sx={{marginTop: 1}}
                    >
                        Submit
                    </Button>
                    </Container>
                </form>
                </Container>
            </Stack>
        </Modal>
    </>
  )
}

export default OfferFormModal
