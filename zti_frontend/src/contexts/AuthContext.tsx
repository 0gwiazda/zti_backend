import {type ReactNode ,createContext, useContext, useEffect, useState } from 'react'

interface IAuthContextType 
{
    isLogged: boolean,
    setIsLogged: (state: boolean) => void,
    currentUserId: number,
    setCurrentUserId: (state: number) => void
}

const AuthContext = createContext<IAuthContextType>({
    isLogged: false,
    setIsLogged: () => {},
    currentUserId: -1,
    setCurrentUserId: () => {}
});

export const useAuth = () =>{
    return useContext(AuthContext)
}


export const AuthProvider = ({children} : {children: ReactNode}) => {
    
    const [isLogged, setIsLogged] = useState(false)
    const [currentUserId, setCurrentUserId] = useState(-1)
    
    useEffect(() => {
        if(localStorage.hasOwnProperty("token"))
        {
            setIsLogged(true)
            const id = localStorage.getItem("user_id")
            setCurrentUserId(parseInt(id != null ? id : "-1"))
        }
    }, [])



  
    return (
        <AuthContext.Provider value={{isLogged, setIsLogged, currentUserId, setCurrentUserId}}>{children}</AuthContext.Provider>
  )
}