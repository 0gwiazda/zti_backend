import { Button, Container, TextField, Typography } from "@mui/material"
import Navbar from "../../components/Navbar"
import { useEffect, useState } from "react"
import { Checkbox } from "@mui/material"
import { useGetCurrentUser } from "../../hooks/UserHooks"
import { useGetItem, usePostItem } from "../../hooks/ItemHooks"
import { useGetOffer, usePostOffer } from "../../hooks/OfferHooks"
import { useNavigate, useParams } from "react-router-dom"


interface IOffer{
    id: number,
    itemid: number,
    itemcount: number,
    auction: boolean,
    startdate: string,
    enddate: string,
    sellerid: number
}

interface IItem{
    id: number,
    name: string,
    description: string,
    price: number
}

const OfferForm = () => {
    const {id} = useParams()
    const parsedId = parseInt(id ? id: "0");

    //Item
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)

    //Offer
    const [count, setCount] = useState(0)
    const [auction, setAuction] = useState(false)
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")

    //Edit
    const [oldOffer, setOldOffer] = useState<IOffer>({} as IOffer)
    const [oldItem, setOldItem] = useState<IItem>({} as IItem)

    const nav = useNavigate()

    const loadOffer = async() =>{
        try{
            const data = await useGetOffer(parsedId)
            setOldOffer(data);
        }
        catch(err: any)
        {
            alert(err.message)
        }
    }

    const loadItem = async() =>{
        try{
            const data = await useGetItem(oldOffer ? oldOffer.itemid : 0)
            setOldItem(data);
        }
        catch(err: any)
        {
            alert(err.message)
        }
    }

    useEffect(()=>{
        if(parsedId != 0)
        {
            loadOffer();
            loadItem();

            setName(oldItem.name);
            setDesc(oldItem.description);
            setPrice(oldItem.price);

        }
    })
  
    const onSubmit = async(e:any) => { 
        e.preventDefault()

        try{
            const user = await useGetCurrentUser()

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
                    sellerid: user.id
                }

                const offer = await usePostOffer(offerData)

                if(!offer)
                {
                alert("oh no")
                }

                nav("/profile")
            }
        }
        catch(err: any){
            alert(err.message)
        }
    }

    return (
    <>
        <Navbar/>
        <Container sx={{display: 'flex', flexDirection: 'column'}}>
            <form onSubmit={onSubmit}>
                <Typography>
                    Item name:
                </Typography>
                <TextField 
                    value={name}
                    onChange={(e:any) => {setName(e.target.value)}}
                    required={true}
                />
                <Typography>
                    Item description:
                </Typography>
                <TextField 
                    value={desc}
                    onChange={(e:any) => {setDesc(e.target.value)}}
                    required={true}
                />
                <Typography>
                    Item price:
                </Typography>
                <TextField 
                    type="number"
                    value={price}
                    onChange={(e:any) => {setPrice(parseInt(e.target.value))}}
                    required={true}
                />
                <Typography>
                    Item count:
                </Typography>
                <TextField 
                    value={count}
                    onChange={(e:any) => {setCount(e.target.value)}}
                    required={true}
                />
                <Typography>
                    Is Auction?
                </Typography>
                <Checkbox
                    checked={auction}
                    onChange={() => {setAuction(!auction)}}
                />
                {auction && <>
                        <Typography>
                            Start Date:
                        </Typography>
                        <TextField 
                            type="datetime-local"
                            value={start}
                            onChange={(e:any) => {setStart(e.target.value + ":00")}}
                            required={true}
                        />
                        <Typography>
                            End Date:
                        </Typography>
                        <TextField 
                            type="datetime-local"
                            value={end}
                            onChange={(e:any) => {setEnd(e.target.value + ":00")}}
                            required={true}
                        />
                    </>
                }<br/>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    </>
  )
}

export default OfferForm
