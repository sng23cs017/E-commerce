import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Checkout from './pages/Checkout'
import Notifications from './pages/Notifications'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/notifications' element={<Notifications/>} />      
     </Routes>
    </>
  )
}

export default App
