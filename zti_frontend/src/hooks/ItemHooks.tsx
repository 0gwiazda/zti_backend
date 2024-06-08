import {getTokenHeader} from './UtilityHooks'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/item'

export const useGetItem = async(id:number) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/${id}`)
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

export const usePostItem = async(item: Object) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.post(`${URL}/item`, item)
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