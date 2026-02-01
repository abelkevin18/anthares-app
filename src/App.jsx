import { useState } from 'react'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { Navbar } from './components/NavBar.jsx'

function App() {

  return (
    <>
      <div className="container">
        <Navbar />
        <AppRoutes />
      </div>
    </>
  )
}

export default App
