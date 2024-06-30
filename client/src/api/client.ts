import axios from 'axios'

console.log(import.meta.env.VITE_API_BASE_URL)
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
    return response.data
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      console.log('retry')
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
