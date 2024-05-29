import axios from 'axios'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/offer'

const token = (localStorage.hasOwnProperty("token")) ? localStorage.getItem("token") : ""

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

export const useGetOffers = async() => {
    const res = await axiosHeader.get(URL + NON_AUTH_ENDPOINT)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const useGetUsersOffers = async(userId: number) => {
    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${userId}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}