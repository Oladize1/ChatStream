import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  toast  from 'react-hot-toast'
import Spinner from '../Components/Spinner'
import { useAuthStore } from '../Store/Store'


const LoginPage = () => {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
 

  const {authUser, login, isLoading, error} = useAuthStore()
  
  

  const navigate = useNavigate()
  
  useEffect(() => {
    if (authUser) {
      navigate('/')
    }
  }, [navigate, authUser])
  
  if (isLoading) {
    return <Spinner />
  }

 const canSave = Boolean(email) && Boolean(password) 




 const handleLogin = async e => {
  e.preventDefault()
  try {
    await login(email, password)
    navigate('/')
  } catch (error) {
    toast.error(error.response?.data.message || 'Invalid credentials')  
    console.log('error during login', error) 
  }
 }

 

  return (
    <div>
      <form className='rounded-md ring-1 p-4 mx-auto w-96 m-5' onSubmit={handleLogin}>
        <h2 className='text-center text-bold text-3xl py-2.5'>Login</h2>
      <div className='mb-2'>
      <input className="input validator"
            type="email" 
            required 
            placeholder="mail@site.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
       />
        <div className="validator-hint">Enter valid email address</div>
      </div>
      <div>
        <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
  <input
   type="password"
   required
   placeholder="Password" 
   minLength="8" 
   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
   title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
   value={password}
   onChange={(e) => setPassword(e.target.value)} 
   />
        </label>
        <p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br/>At least one number
  <br/>At least one lowercase letter
  <br/>At least one uppercase letter
        </p>
      </div>
      <button disabled={!canSave} className="flex btn bg-blue-500 text-amber-100  btn-wide items-center mt-2 mx-auto">Login</button>
      <p className="text-center mt-2">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
      </form>
    </div>
  )
}

export default LoginPage