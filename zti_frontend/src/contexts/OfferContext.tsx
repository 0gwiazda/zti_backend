import {type ReactNode ,createContext, useContext, useEffect, useState } from 'react'



interface ItemProps{
    id: number,
    name: string,
    
}


interface OfferProps{
    id: number
    itemid: number
    itemcount: number
    auction: boolean
    startdate: string
    enddate: string
    sellerid: number
    item: ItemProps
}


interface IOfferContext 
{
    offers: Array<OfferProps>
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