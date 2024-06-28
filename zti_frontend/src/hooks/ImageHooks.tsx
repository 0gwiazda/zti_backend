import {getTokenHeader} from './UtilityHooks'

const URL = 'http://localhost:8081'
const NON_AUTH_ENDPOINT = '/auth/image'

export const useGetImage = async(itemid:number) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/${itemid}`, {
            responseType: 'blob',
            withCredentials: true
        })
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

export const usePostImage = async(image: FormData, itemid:number) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.post(`${URL}/image/${itemid}`, image, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }})
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

export const useDeleteImage = async(itemid:number) => {
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.delete(`${URL}/image/${itemid}`)
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