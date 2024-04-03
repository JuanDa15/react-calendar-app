import axios from "axios"
import { getEnvVariables } from "../helpers"

const { VITE_API_URL } = getEnvVariables()

export const calendarApi = axios.create({
  baseURL: VITE_API_URL
})

calendarApi.interceptors.request.use(config => {

  const skipAuthorization = ['auth', 'auth/register']
  if (!skipAuthorization.includes(config.url || '')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
})
// TODO: CONFIG INTERCEPTORES