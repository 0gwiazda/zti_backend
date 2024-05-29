import axios from 'axios'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/user'

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

export const useGetUser = async(id:number) =>
{
    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/${id}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useGetCurrentUser = async() =>
{
    const res = await axiosHeader.get(`${URL}/user/me`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useLogin = async(user:Object) => 
{
    const res = await axiosHeader.post(`${URL}/auth/authenticate`, user)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useRegister = async(user: Object) =>
{
    const res = await axiosHeader.post(`${URL}/auth/register`, user)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}
