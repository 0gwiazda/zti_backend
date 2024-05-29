import axios from 'axios'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/comment'

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

export const useGetUserComments = async(id:number) =>
{
    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${id}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const usePostComment = async(comment: Object) => 
{
    const res = await axiosHeader.post(`${URL}/comment`, comment)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const usePutComment = async(id:number, comment: Object) =>
{
    const res = await axiosHeader.put(`${URL}/comment/${id}`, comment)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const useDeleteComment = async(id: number) =>
{
    const res = await axiosHeader.delete(`${URL}/comment/${id}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}
