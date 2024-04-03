import { useDispatch, useSelector } from "react-redux";
import { AppStore, onAuthError, onChecking, onLogin, onLogout } from "../store";
import { calendarApi } from "../api";
import { castToAxiosError } from "../helpers/cast-http-error";
import { LoginResponse, ServerResponse } from "../definitions";
import useCalendarStore from "./calendar-hook";

interface IOnRegisterProps {
  name: string,
  email: string,
  password: string
}

interface IOnLoginProps {
  email: string,
  password: string
}

export default function useAuthStore() {
  const { status, errorMessage, user } = useSelector((state: AppStore) => state.auth)
  const { clearCalendarStoreFn } = useCalendarStore()
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }: IOnLoginProps) => {
    dispatch(onChecking())
    try {
      const resp = await calendarApi.post('auth', { email, password })
      const { data }: ServerResponse<LoginResponse> = resp.data
      const { token, ...user } = data!
      localStorage.setItem('token', token)
      dispatch(onLogin(user))
    } catch (error) {
      const { response } = castToAxiosError(error)
      dispatch(onAuthError(response?.data.message))
    }
  }

  const startRegister = async ({ name, email, password }: IOnRegisterProps) => {
    try {
      await calendarApi.post('auth/register', { name, email, password })
      startLogin({ email, password })
    } catch (error) {
      const { response } = castToAxiosError(error)
      dispatch(onAuthError(response?.data.message))
    }
  }

  const logout = () => {
    localStorage.clear()
    dispatch(clearCalendarStoreFn())
    dispatch(onLogout())
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('token')

    if (!token) return dispatch(onLogout())

    dispatch(onChecking())
    try {
      const resp = await calendarApi.post('auth/renew')
      const { data }: ServerResponse<LoginResponse> = resp.data
      const { token, ...user } = data!
      localStorage.setItem('token', token)
      dispatch(onLogin(user))
    } catch (error) {
      const { response } = castToAxiosError(error)
      dispatch(onAuthError(response?.data.message))
    }
  }

  return {
    status,
    errorMessage,
    user,
    // METHODS
    startLogin,
    startRegister,
    logout,
    checkAuth
  }
}