import { useAuthStore } from '@/stores/auth.store'
import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Response interceptor for API calls
client.interceptors.response.use(
  (response) => {
    // return the data directly
    return response.data
  },
  async function (error) {
    // formate error message and try refreshing the current user token
    const authStore = useAuthStore()
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await authStore.authenticate({ url: '/authentication/refresh-token', body: {} })
        return client(originalRequest)
      } catch (err) {
        if (error.response) {
          const err = error.response?.data ? error.response?.data : error.response
          return Promise.reject(err)
        } else {
          return Promise.reject(error)
        }
      }
    }
    if (error.response) {
      const err = error.response?.data ? error.response?.data : error.response
      return Promise.reject(err)
    } else {
      return Promise.reject(error)
    }
  }
)

export { client }
