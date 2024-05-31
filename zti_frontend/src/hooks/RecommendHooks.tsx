import { getTokenHeader } from "./UtilityHooks";

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/recommend'

export const useGetLikes = async(id: number) =>{
    const axiosHeader = getTokenHeader();

    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${id}?liked=true`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const useGetDislikes = async(id: number) =>{
    const axiosHeader = getTokenHeader();

    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${id}?liked=false`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const useGetRecommend = async(userid: number, sellerid: number) =>{
    const axiosHeader = getTokenHeader();

    const res = await axiosHeader.get(`${URL}/recommend?userid=${userid}&sellerid=${sellerid}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const usePostRecommend = async(recommend: Object) => {
    const axiosHeader = getTokenHeader();

    const res = await axiosHeader.post(`${URL}/recommend`, recommend);

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const usePutRecommend = async(id: number, recommend: Object) =>{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.put(`${URL}/recommend/${id}`, recommend)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useDeleteRecommend = async(id: number) => {
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.delete(`${URL}/recommend/${id}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}