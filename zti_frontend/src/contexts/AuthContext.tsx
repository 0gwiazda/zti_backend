import { jwtDecode } from 'jwt-decode';
import {type ReactNode ,createContext, useContext, useEffect, useState } from 'react'

interface IAuthContextType 
{
    isLogged: boolean,
    setIsLogged: (state: boolean) => void
}

const AuthContext = createContext<IAuthContextType>({
    isLogged: false,
    setIsLogged: () => {}
});

export const useAuth = () =>{
    return useContext(AuthContext)
}


export const AuthProvider = ({children} : {children: ReactNode}) => {
    
    const [isLogged, setIsLogged] = useState(false)
    
    useEffect(() => {
        if(localStorage.hasOwnProperty("token"))
        {
            setIsLogged(true)
        }
    }, [])

  
    return (
        <AuthContext.Provider value={{isLogged, setIsLogged}}>{children}</AuthContext.Provider>
  )
}