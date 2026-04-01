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
import NotFoundPage from './Pages/NotFoundPage.jsx'
import VideoCall from './Components/VideoCall.jsx'


const App = () => {
  const { checkAuth } = useAuthStore()
  
  useEffect(()=>{
    checkAuth()
  }, [checkAuth])
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Toaster/>
      <Navbar/>
      <main className="flex-1 min-h-0 overflow-y-auto flex flex-col relative">
        <Routes>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='' element={<ProtectedRoute/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/video-call' element={<VideoCall/>}/>
          </Route>
            <Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App