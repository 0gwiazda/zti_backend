import { RouterProvider } from 'react-router-dom'
import { RouterPaths } from './utilities/Routes'
import React from 'react'

function App() {


  return (
    <React.StrictMode>
        <RouterProvider router={RouterPaths}/>
    </React.StrictMode>
  )
}

export default App
