import React, {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './Store/Store'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import ProtectedRoute from './Components/ProtectedRoute'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import ProfilePage from './Pages/ProfilePage'
import ChatRoom from './Components/ChatRoom.jsx'
import Socket from './Components/socket.jsx'
const App = () => {
  const { authUser, checkAuth } = useAuthStore()
  
  useEffect(()=>{
    checkAuth()
  }, [checkAuth])
  console.log(authUser)
  return (
    <>
    <Toaster/>
      <Navbar/>
    <Routes>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route element={<ProtectedRoute/>}>
        {/* <Route path='/' element={<HomePage/>}/> */}
        <Route path='/' element={<Socket/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App