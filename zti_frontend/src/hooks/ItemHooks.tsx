import {getTokenHeader} from './UtilityHooks'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/item'

export const useGetItem = async(id:number) => {
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/${id}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}

export const usePostItem = async(item: Object) => {
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.post(`${URL}/item`, item)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data;
}