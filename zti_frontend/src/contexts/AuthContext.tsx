import {type ReactNode ,createContext, useContext, useEffect, useState } from 'react'

interface IAuthContextType 
{
    isLogged: boolean,
    setIsLogged: (state: boolean) => void,
    isAdmin: boolean,
    setIsAdmin: (state: boolean) => void,
    currentUserId: number,
    setCurrentUserId: (state: number) => void
}

const AuthContext = createContext<IAuthContextType>({
    isLogged: false,
    setIsLogged: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
    currentUserId: -1,
    setCurrentUserId: () => {}
});

export const useAuth = () =>{
    return useContext(AuthContext)
}


export const AuthProvider = ({children} : {children: ReactNode}) => {
    
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentUserId, setCurrentUserId] = useState(-1)
    
    useEffect(() => {
        if(localStorage.hasOwnProperty("token"))
        {
            setIsLogged(true)
            const id = localStorage.getItem("user_id")
            setCurrentUserId(parseInt(id != null ? id : "-1"))
        }

        if(localStorage.hasOwnProperty("user_role"))
        {
            setIsAdmin(localStorage.getItem("user_role") === "ADMIN")
        }
        
    }, [isLogged])



  
    return (
        <AuthContext.Provider value={{isLogged, setIsLogged, isAdmin, setIsAdmin, currentUserId, setCurrentUserId}}>{children}</AuthContext.Provider>
  )
}