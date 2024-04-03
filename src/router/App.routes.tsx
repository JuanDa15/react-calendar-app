import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/Login.page";
import CalendarPage from "../calendar/pages/Calendar.page";
import useAuthStore from "../hooks/auth-store-hook";
import { useEffect } from "react";
export default function AppRouter (): JSX.Element {
  const { status, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  if (status === 'checking') {
    return <h1>Loading...</h1>
  }

  return (
    <Routes>
      {
        status === 'not-authenticated'
          ? <Route path="/auth/login" element={ <LoginPage />} />
          : <Route path="/calendar" element={ <CalendarPage />}/>
      }
      <Route path="*" element={ <Navigate to={ status === 'authenticated' ? '/calendar' : '/auth/login'} />} />
    </Routes>
  )
}
