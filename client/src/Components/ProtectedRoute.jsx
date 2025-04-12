import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../Store/Store'
const ProtectedRoute = () => {
    const { authUser } = useAuthStore()

    if(!authUser){
      return <Navigate to={'/login'}/>
    }
    
  return <Outlet/>
}

export default ProtectedRoute