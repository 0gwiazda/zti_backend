import { Button, Container, FilledInput, FormGroup, FormLabel, Modal, Stack, Typography } from "@mui/material"
import React, { useState } from "react"
import { usePostImage } from "../../hooks/ImageHooks"


interface FormProps{
    itemid: number;
    loadOffers: () => Promise<void>;
}


const OfferAddImageModal:React.FC<FormProps> = ({
    itemid,
    loadOffers,
}) => {

    //Modal
    const [open, setOpen] = useState(false)
  
    const onSubmit = async(e:any) => { 
        e.preventDefault()

        try{
            const file = e.target[0].files[0]
            const formData = new FormData();
            formData.append('file', file);

            await usePostImage(formData, itemid);
            await loadOffers()
            setOpen(false)
            
        }
        catch(err: any){
            alert(err.message)
        }
    }

    return (
    <>
        <Button 
            sx={{marginBottom: 2, marginTop: 1}}
            onClick={() => setOpen(true)}
        >
            Add Image
        </Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Stack sx={{display: 'flex', flexDirection: 'column', padding: "20px", position:"fixed", minWidth: "50%", minHeight: "50%", maxWidth: "1200px", maxHeight: "1400px", overflow: "auto", backgroundColor: "#eeeeee", borderRadius: "5px", top:"50%", bottom:"50%", left: '50%', right: '50%', transform: "translate(-50%, -50%)"}}>
                <Container>
                <Typography
                    variant='h5'>
                    Add Image    
                </Typography>
                <form onSubmit={onSubmit}>
                    <Container>
                    <FormGroup>
                        <FormLabel htmlFor="image">Item Image:</FormLabel>
                        <FilledInput
                        type="file"
                        id="image"
                        required
                        />
                    </FormGroup>
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

export default OfferAddImageModal
