import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import OfferForm from '../pages/Offers/OfferForm'

export const RouterPaths = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/profile/:id?",
        element: <Profile/>
    },
    {
        path:"/add-offer",
        element: <OfferForm/>
    }
])
