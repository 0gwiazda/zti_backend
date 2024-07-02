import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile/Profile'
import FullOffer from '../pages/Offers/FullOffer'
import ArchivedOffers from '../pages/Archive'
import NotFound from '../pages/NotFound'
import AdminPanel from '../pages/AdminPanel'

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
        path:"/offer/:id",
        element: <FullOffer/>
    },
    {
        path: "/offers/archive",
        element: <ArchivedOffers/>
    },
    {
        path: "/admin",
        element: <AdminPanel/>
    },
    {
        path:"/*",
        element: <NotFound/>
    }
])
