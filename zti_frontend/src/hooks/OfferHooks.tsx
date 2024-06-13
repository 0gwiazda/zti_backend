import { useEffect, useState } from 'react'
import { getTokenHeader } from './UtilityHooks'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/offer'

export const useGetOffers = async() => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(URL + NON_AUTH_ENDPOINT)
        return res.data;
    }
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  

}

export const useGetAvailableOffers = async() => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(`${URL + NON_AUTH_ENDPOINT}/available`)
        return res.data;
    }
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  
}

export const useGetOffer = async(id: number) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(`${URL + NON_AUTH_ENDPOINT}/${id}`)
        return res.data;
    }
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  

}

export const useGetUsersOffers = async(userId: number) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${userId}`)
        return res.data;
    }
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  
}

export const useGetOfferItem = async(id: number) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(`${URL + NON_AUTH_ENDPOINT}/item/${id}`)
        return res.data;
    }
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  

}

export const useBuyOffer = async(offerid: number, offer: Object) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.put(`${URL}/offer/buy/${offerid}`, offer)
        return res.data;
    }
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  
}

export const useAuctionOffer = async(offerid: number, price: number, offer: Object) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.put(`${URL}/offer/auction/${offerid}?newPrice=${price}`, offer)
        return res.data;
    }    
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  

}

export const useBuyAuctionOffer = async(offerid: number, offer: Object) => {
    const axiosHeader = getTokenHeader()

    try
    {    
        const res = await axiosHeader.put(`${URL}/offer/auction/buy/${offerid}`, offer)
        return res.data;
    }    
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  

}

export const usePostOffer = async(offer: Object) => 
{
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.post(`${URL}/offer`, offer)
        return res.data;
    }
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  

}

export const useDeleteOffer = async(id: number) => 
{
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.delete(`${URL}/offer/${id}`)
        return res.data
    }
    catch(error: any)
    {
        if(error.response)
        {
            throw new Error("ERROR Code: " + error.response.status + "\nError message: " + error.response.data)
        }
    }  

}

