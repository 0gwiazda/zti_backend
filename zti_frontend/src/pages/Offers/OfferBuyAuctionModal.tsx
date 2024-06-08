import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"



interface ModalProps{
    OnSubmit: (a: number) => Promise<void>,
    OnAuction: (a: number) => Promise<void>,
    price: number
    auction: boolean,
}


const OfferBuyAuctionModal:React.FC<ModalProps> = ({
    OnSubmit,
    OnAuction,
    price,
    auction,
}) => {

    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(0)
    const [newPrice, setPrice] = useState(0)

    const onClick = (e:any) => {
        e.preventDefault()
        OnSubmit(amount)
        setOpen(false)
    }

    const onAuction = (e:any) => {
        e.preventDefault()
        OnAuction(newPrice)
        setOpen(false)
    }

  return (
    <>
        {!auction ? ( 
        <form onSubmit={(e:any) => {e.preventDefault(); setOpen(true);}}>
            <TextField
                value={amount}
                onChange={(e:any) => setAmount(parseInt(e.target.value))}
            />
            <Button
                type="submit"
            >
                Buy Item
            </Button>
        </form>) : (<form onSubmit={(e:any) => {e.preventDefault(); setOpen(true);}}>
            <TextField
                value={newPrice}
                onChange={(e:any) => setPrice(parseInt(e.target.value))}
            />
            <Button
                type="submit"
            >   
                Auction Item
            </Button></form>
        )}
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
        {!auction ? (<Stack sx={{display: 'flex', position: 'fixed', width: 500, height: 300,  alignItems: "center", justifyContent: "space-evenly", left: '50%', right: '50%', top: '50%', bottom: '50%', transform: "translate(-50%, -50%)", backgroundColor: "#333333", borderRadius: "8px"}}>
            {amount > 0 ? (<form onSubmit={onClick}>
                <Typography
                    variant="h5"
                >
                    Do you want to purchase {amount} items for {amount*price}$?
                </Typography>
                <Box sx={{display: 'flex', minWidth: 300, justifyContent: 'space-evenly'}}>
                    <Button
                        sx={{color: "white"}}
                        type="submit"
                    >
                        Buy items
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>):(<Box sx={{display: 'flex', minWidth: 300, justifyContent: "center"}}><Typography
                    variant="h5"
                    align="center"
                >
                    Please type how many items you want to purchase.
                </Typography></Box>)}
        </Stack>) : (<Stack sx={{display: 'flex', position: 'fixed', width: 500, height: 300,  alignItems: "center", justifyContent: "space-evenly", left: '50%', right: '50%', top: '50%', bottom: '50%', transform: "translate(-50%, -50%)", backgroundColor: "#333333", borderRadius: "8px"}}>
            {price > 0 ? (<form onSubmit={onAuction}>
                <Typography
                    variant="h5"
                >
                    Do you want to participate in auction for {price}$?
                </Typography>
                <Box sx={{display: 'flex', minWidth: 300, justifyContent: 'space-evenly'}}>
                    <Button
                        sx={{color: "white"}}
                        type="submit"
                    >
                        Auction
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>):(<Box sx={{display: 'flex', minWidth: 300, justifyContent: "center"}}><Typography
                    variant="h5"
                    align="center"
                >
                    Please type how many items you want to purchase.
                </Typography></Box>)}</Stack>)}
        </Modal>
    </>
  )
}

export default OfferBuyAuctionModal
