import { getTokenHeader } from "./UtilityHooks";

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/recommend'

export const useGetLikes = async(id: number) =>{
    const axiosHeader = getTokenHeader();

    try
    {
        const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${id}?liked=true`)
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

export const useGetDislikes = async(id: number) =>{
    const axiosHeader = getTokenHeader();

    try
    {
        const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${id}?liked=false`)
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

export const useGetRecommend = async(userid: number, sellerid: number) =>{
    const axiosHeader = getTokenHeader();

    try
    {
        const res = await axiosHeader.get(`${URL}/recommend?userid=${userid}&sellerid=${sellerid}`)
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

export const usePostRecommend = async(recommend: Object) => {
    const axiosHeader = getTokenHeader();


    try
    {
        const res = await axiosHeader.post(`${URL}/recommend`, recommend);
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

export const usePutRecommend = async(id: number, recommend: Object) =>{
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.put(`${URL}/recommend/${id}`, recommend)
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

export const useDeleteRecommend = async(id: number) => {
    const axiosHeader = getTokenHeader()

    try
    {        
        const res = await axiosHeader.delete(`${URL}/recommend/${id}`)
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