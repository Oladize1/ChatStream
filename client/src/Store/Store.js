import { create } from 'zustand'
import { axiosInstance } from './AxiosInstance.js'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

export const useAuthStore = create(persist(
  (set, get) => ({
    isAuthenticated: false,
    authUser: null,
    isLoading: false,
    error: null,
    friendsList: [],
    selectedUser: null,
    onlineUsers: [],
    selectedUserMessages: [],
    socket: null,

    signup: async (name, email, password) => {
      set({ isAuthenticated: false, isLoading: true, error: null, authUser: null })
      try {
        const res = await axiosInstance.post('/auth/signup', { name, email, password })
        toast.success('Sign up successful')
        set({ isLoading: false, isAuthenticated: true, authUser: res.data })
        get().connectSocket()
      } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed")
        set({ isAuthenticated: false, isLoading: false, error: error.response?.data?.message, authUser: null })
      }
    },

    login: async (email, password) => {
      set({ isAuthenticated: false, isLoading: true, error: null, authUser: null })
      try {
        const res = await axiosInstance.post('/auth/login', { email, password })
        toast.success('Login successful')
        set({ isAuthenticated: true, isLoading: false, authUser: res.data, friendsList: res.data.friends })
        get().connectSocket()
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed")
        set({ isAuthenticated: false, isLoading: false, error: error.response?.data?.message, authUser: null })
      }
    },

    logout: async () => {
      set({ isLoading: true, error: null })
      try {
        await axiosInstance.post('/auth/logout')
        get().disconnectSocket()
        set({ isAuthenticated: false, isLoading: false, authUser: null, friendsList: [], selectedUser: null, selectedUserMessages: [], onlineUsers: [] })
        toast.success('Logged out successfully')
      } catch (error) {
        toast.error('Logout failed')
        set({ isLoading: false, error: error.response?.data?.message })
      }
    },

    updateProfilePic: async (profilePic) => {
      set({ isLoading: true, error: null })
      try {
        const res = await axiosInstance.put('/auth/update-profile', { profilePic })
        set({ isLoading: false, authUser: res.data.updatedUser })
        toast.success('Profile Picture Updated!')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Update failed')
        set({ isLoading: false, error: error.response?.data?.message })
      }
    },

    checkAuth: async () => {
      set({ isLoading: true, error: null })
      try {
        const res = await axiosInstance.get('/auth/check')
        console.log(res)
        set({ isAuthenticated: true, isLoading: false, authUser: res.data, friendsList: res.data.friends })
        get().connectSocket()
      } catch (error) {
        set({ isLoading: false, error: error.response?.data?.message, authUser: null, isAuthenticated: false })
      }
    },

    getMessage: async (id) => {
      set({ isLoading: true, error: null })
      try {
        const messages = await axiosInstance.get(`/message/${id}`)
        set({ isLoading: false, selectedUser: id, selectedUserMessages: messages.data })
      } catch (error) {
        set({ isLoading: false, error: error.response?.data?.message })
      }
    },

    addFriend: async (email) => {
      set({ isLoading: true, error: null })
      try {
        const res = await axiosInstance.post('/auth/add-friends', { email })
        set({ isLoading: false, friendsList: res.data.friends })
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add friend")
        set({ isLoading: false, error: error.response?.data?.message })
      }
    },

    sendMessage: async (message, image, id) => {
      set({ isLoading: true, error: null })
      try {
        const res = await axiosInstance.post(`/message/send/${id}`, { message, image })
        const messages = get().selectedUserMessages
        set({ isLoading: false, selectedUserMessages: [...messages, res.data] })
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send message")
        set({ isLoading: false, error: error.response?.data?.message })
      }
    },

    connectSocket: () => {
      const { authUser, socket } = get()
      if (!authUser || (socket && socket.connected)) return

      const newSocket = io('http://localhost:3000', {
        auth: { userId: authUser._id },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })

      set({ socket: newSocket })

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id)
      })

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected")
      })

      newSocket.on("onlineUsers", (users) => {
        set({ onlineUsers: users })
      })
    },
    subscribeToMessage: () => {
      const {selectedUser, socket, selectedUserMessages} = get()
       if (!socket || !selectedUser) {
           console.warn("Socket not ready or no user selected");
          return;
     } 
      socket.on("newMessage", (newMessage) => {
  if (newMessage.senderId !== selectedUser) return;

  set((state) => ({
    selectedUserMessages: [...state.selectedUserMessages, newMessage],
  }))
})

    },
    unSubscribeToMessage: () => {
      const {socket} = get()
      if (socket) {
        socket.off("newMessage")
      }
    },
    disconnectSocket: () => {
      const { socket } = get()
      if (socket) {
        socket.disconnect()
        set({ socket: null })
      }
    },
  }),
  {
    name: 'auth-storage',
    partialize: (state) => ({
      isAuthenticated: state.isAuthenticated,
      authUser: state.authUser,
      selectedUser: state.selectedUser,
      selectedUserMessages: state.selectedUserMessages,
      error: state.error,
      isLoading: state.isLoading,
    }),
  }
))
