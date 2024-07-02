import {getTokenHeader} from './UtilityHooks'

const URL = 'http://localhost:8081'
const NON_AUTH_ENDPOINT = '/auth/comment'

export const useGetUserComments = async(id:number) =>
{
    const axiosHeader = getTokenHeader()

    try{
        const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${id}`, {withCredentials: true})
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

export const usePostComment = async(comment: Object) => 
{
    const axiosHeader = getTokenHeader()

    try{
        const res = await axiosHeader.post(`${URL}/comment`, comment)
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

export const usePutComment = async(id:number, comment: Object) =>
{
    const axiosHeader = getTokenHeader()

    try{
        const res = await axiosHeader.put(`${URL}/comment/${id}`, comment)
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

export const useDeleteComment = async(id: number) =>
{
    const axiosHeader = getTokenHeader()

    try{
        const res = await axiosHeader.delete(`${URL}/comment/${id}`)
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
