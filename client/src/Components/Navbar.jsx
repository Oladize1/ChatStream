import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../Store/Store'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [newFriend, setNewFriend] = useState('')
  const {authUser, logout, addFriend } = useAuthStore()


  const handleAddNewFriend = async() => {
    try {
      await addFriend(newFriend)
      setNewFriend('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to={'/'}>
        <img src="./logo-transparent.png" alt="Chat Stream logo" width={60} height={60}/>
    </Link>
  </div>
  {authUser ?
   <div className="flex gap-2">
    <div className='flex'>
      <div className="flex flex-col gap-1">
    <input className="input validator"
            type="email" 
            required 
            placeholder="mail@site.com" 
            value={newFriend} 
            onChange={(e) => setNewFriend(e.target.value)} 
       />
        <div className="validator-hint">Enter valid email address</div>
      </div>
    <button className='btn ' onClick={() => handleAddNewFriend()}>Add Friend</button>
    </div>
   
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={authUser?.profilePic || './profile.png'} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/profile'} className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link>Settings</Link></li>
        <li className='cursor-pointer' onClick={() => logout()}>Logout</li>
      </ul>
    </div>
  </div>
  : ''}
 
    </div>
  )
}

export default Navbar