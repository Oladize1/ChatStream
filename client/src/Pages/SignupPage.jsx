import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../Store/Store'
import Spinner from '../Components/Spinner'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const [name, setName] = useState('') 
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('') 

  const {authUser, signup, error, isLoading } = useAuthStore()
  
  
  const navigate = useNavigate()

  
  
  useEffect(() => {
    if (authUser) {
      navigate('/')
    }
  }, [navigate, authUser])

  if (isLoading) {
    return <Spinner/>
  }
  

  const canSave = Boolean(name) && Boolean(email)  && Boolean(password) && Boolean(confirmPassword)

  const handleSignup = async(e) => {
    e.preventDefault()
    if (password.trim() != confirmPassword.trim()) {
        toast.error('Password do not match')
        return
    }
    
    try {
        await signup(name, email, password)
    } catch (error) {
        console.log(error)        
        toast.error(error.response.data?.message || 'errror')  
    }
    
  }
 
  return (
    <div>
      <form className='rounded-md ring-1 p-4 mx-auto w-96 m-5' onSubmit={handleSignup}>
        <h2 className='text-center text-bold text-3xl py-2.5'>Sign Up</h2>
      <div>
      <label className="input validator">
          <svg
           className="h-[1em] opacity-50" 
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round"  strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2">
                </path>
                <circle cx="12" cy="7" r="4"/>
            </g>
          </svg>
          <input 
          type="text" 
          required 
          placeholder="Name" 
          pattern="[A-Za-z][A-Za-z0-9\-]*" 
          minLength="3"
          maxLength="30" 
          title="Only letters or numbers"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          />
      </label>
    <p className="validator-hint">
      Must be 3 to 30 characters
      <br/>containing only letters or numbers
      </p>
      </div>
      <div className='mb-2'>
      <input className="input validator" type="email" required placeholder="mail@site.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="validator-hint">Enter valid email address</div>
      </div>
      <div>
        <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
  <input type="password"
   required placeholder="Password" 
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
      <div className='mt-10'>
        <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
  <input type="password"
   required placeholder=" Confirm Password" 
   minLength="8" 
   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
   title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
   value={confirmPassword}
   onChange={(e) => setConfirmPassword(e.target.value)} 
   />
        </label>
        <p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br/>At least one number
  <br/>At least one lowercase letter
  <br/>At least one uppercase letter
        </p>
      </div>
      <button disabled={!canSave} className="flex btn bg-blue-500 text-amber-100  btn-wide items-center mt-2 mx-auto">Sign up</button>
      <p className="text-center mt-2">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  )
}

export default SignUpPage