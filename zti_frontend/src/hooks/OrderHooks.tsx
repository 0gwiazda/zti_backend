import { getTokenHeader } from "./UtilityHooks";

const URL = 'http://localhost:8081'



export const useGetUserOrders = async(id: number) =>
{
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(`${URL}/order?userId=${id}`)
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

export const useCountOrders = async(id: number) => 
{
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.get(`${URL}/count-orders/${id}`)
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

export const usePostOrder = async(order: Object) =>
{
    const axiosHeader = getTokenHeader()

    try
    {
        const res = await axiosHeader.post(`${URL}/order`, order)
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