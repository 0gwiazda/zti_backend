import axios from 'axios'
import { useEffect, useState } from 'react'


const SECOND = 1_000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24


export const getTokenHeader = () =>{
    const token = localStorage.hasOwnProperty('token') ? localStorage.getItem('token') : ""

    const jsonEncodingHeader = (token !== "") ? {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        charset: "utf-8",
    } : {
        "Content-Type": "application/json",
        charset: "utf-8",
    }

    const axiosHeader = axios.create({
        headers: {...jsonEncodingHeader}
    })

    return axiosHeader
}

export const isOfferArchived = (offer: any) => {

    if(offer.auction){
        const current = new Date();
        const endDate = new Date(offer.enddate);
        return current > endDate
    }

    return parseInt(offer.itemcount) <= 0
}

export const getTimer = (end: string, interval: number = SECOND) => {

    const [time, setTime] = useState(isNaN(Date.parse(end)) ? 0 : - Date.now())

    useEffect(() => {

        if(isNaN(Date.parse(end))){
            return;
        }

        setTime(Date.parse(end) - Date.now())

        const interv = setInterval(() => {setTime((_time) => _time - interval)
    }, interval);
    return () => {
        clearInterval(interv)};
    }, [interval, end]);

    return {
        days: Math.floor(time / DAY),
        hours: Math.floor((time / HOUR) % 24),
        minutes: Math.floor((time / MINUTE) % 60),
        seconds: Math.floor((time / SECOND) % 60),
    }
}