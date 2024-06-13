import { Container, Typography } from "@mui/material"
import UserList from "./Users/UserList"
import { useEffect, useState } from "react"
import { useGetUsers } from "../hooks/UserHooks"
import Navbar from "../components/Navbar"



const AdminPanel = () => {

    const [users, setUsers] = useState([])

    const loadUsers = async() => {
        try{
            const res = await useGetUsers()

            setUsers(res)
        }catch(err: any) {
            alert(err.message)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

  return (
    <>
        <Navbar/>
        <Container>
            <Typography
                variant="h4"
            >
                Admin Panel
            </Typography>
            <UserList users={users} title="Users"/>
        </Container>
    </>
  )
}

export default AdminPanel
