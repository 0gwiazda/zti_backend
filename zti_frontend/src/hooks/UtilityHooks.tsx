import axios from 'axios'

export const getTokenHeader = () =>{
    const token = localStorage.hasOwnProperty('token') ? localStorage.getItem('token') : ""

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

    return axiosHeader
}