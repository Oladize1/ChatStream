import { create } from 'zustand'
import { axiosInstance } from './AxiosInstance.js'
import toast from 'react-hot-toast'
import axios from 'axios'


export const useAuthStore = create((set, get) =>  ({
    isAuthenticated: false,
    authUser: null,
    isLoading: false,
    error: null,
    signup: async(name, email, password) => {
       set({isAuthenticated:false, isLoading:true, error: null, authUser: null})
       try {
        const res = await axiosInstance.post('/auth/signup', {name, email, password})
        if (res.data) {
            toast.success('Sign up successful')
        }
        set({isLoading:false, isAuthenticated: true, authUser: res.data})
        console.log(get().authUser)
       } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response?.data?.message)
        set({isAuthenticated:false, isLoading:false, error:error.response.data.message, authUser: null})
       } 
    },
    login: async(email, password) => {
        set({isAuthenticated:false, isLoading:true, error: null, authUser: null})
        try {
            const res = await axiosInstance.post('/auth/login', {email, password})
            if(res.data){
                toast.success('login successfully')
            }
            set({isAuthenticated:true, isLoading:false, error:null, authUser: res.data})
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response?.data?.message)
            set({isAuthenticated:false, isLoading:false, error:error.response.data.message, authUser: null})
        }
    },
    logout: async() => {
        set({isLoading: true, error: null})
        try {
            await axiosInstance.post('/auth/logout')
            set({isLoading: false, error: null, isAuthenticated: false, authUser: null})
        } catch (error) {
            console('error logging out', error )
            set({isLoading: false, error: error.response.data.message, error: null, isAuthenticated: false, authUser: null})
        }
    },
    updateProfilePic: async(profilePic) => {
        set({isLoading: true, error: null})
        try {
            const res = await axiosInstance.put('/auth/update-profile', {profilePic})
            set({isLoading: false, error: null, authUser: res.data.updatedUser})
            toast.success('Profi;e Picture Uploaded successfully!')
        } catch (error) {
            console.log(error.response.data.message)
            set({isLoading: false, error: error.response.data.message})
            toast.error(error.response.data.message || 'file too large')
        }
    },
    checkAuth: async() => {
        set({isLoading: true, error: null})
        try {
            const res = await axiosInstance.get('/auth/check')
            console.log('check auth data', res.data)
            set({isAuthenticated: true, isLoading: false, error: null, authUser: res.data})
        } catch (error) {
            console.log(error)
            set({isLoading: false, error: error, authUser: null, isAuthenticated: false})
        }
    }
}))