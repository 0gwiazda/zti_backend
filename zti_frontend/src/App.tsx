import { RouterProvider } from 'react-router-dom'
import { RouterPaths } from './utilities/Routes'
import React from 'react'
import { AuthProvider } from './contexts/AuthContext'

function App() {


  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={RouterPaths}/>
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App
