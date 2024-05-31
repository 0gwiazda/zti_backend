import {getTokenHeader} from './UtilityHooks'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/comment'

export const useGetUserComments = async(id:number) =>
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/seller/${id}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const usePostComment = async(comment: Object) => 
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.post(`${URL}/comment`, comment)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const usePutComment = async(id:number, comment: Object) =>
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.put(`${URL}/comment/${id}`, comment)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const useDeleteComment = async(id: number) =>
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.delete(`${URL}/comment/${id}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}
