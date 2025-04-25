import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../Store/Store'
import Spinner from './Spinner'

const ProtectedRoute = () => {
    const { authUser, isLoading } = useAuthStore()

    

    if(!authUser){
      return <Navigate to={'/login'}/>
    }
    
  return <Outlet/>
}

export default ProtectedRoute