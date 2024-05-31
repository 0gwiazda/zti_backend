import { getTokenHeader } from './UtilityHooks'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/offer'

export const useGetOffers = async() => {
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.get(URL + NON_AUTH_ENDPOINT)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const useGetUsersOffers = async(userId: number) => {
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${userId}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const usePostOffer = async(offer: Object) => 
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.post(`${URL}/offer`, offer)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

