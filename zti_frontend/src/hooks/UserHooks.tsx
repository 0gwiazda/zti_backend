import { getTokenHeader } from './UtilityHooks'

const URL = 'http://localhost:8080'
const NON_AUTH_ENDPOINT = '/auth/user'



export const useGetUser = async(id:number) =>
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.get(`${URL}${NON_AUTH_ENDPOINT}/${id}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useGetCurrentUser = async() =>
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.get(`${URL}/user/me`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useLogin = async(user:Object) => 
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.post(`${URL}/auth/authenticate`, user)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useRegister = async(user: Object) =>
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.post(`${URL}/auth/register`, user)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const usePutUser = async(user: Object) => 
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.put(`${URL}/user/me`, user)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useDeleteUser = async(email: String) =>
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.delete(`${URL}/user?email=${email}`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}

export const useLogout = async() =>
{
    const axiosHeader = getTokenHeader()

    const res = await axiosHeader.post(`${URL}/logout`)

    if(res.status != 200)
    {
        throw new Error("Error: " + res.status)
    }

    return res.data
}
