import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/Login.page";
import CalendarPage from "../calendar/pages/Calendar.page";
export default function AppRouter (): JSX.Element {
  const authStatus = 'not-authenticated'

  return (
    <Routes>
      {
        authStatus === 'authenticated'
          ? <Route path="/auth/login" element={ <LoginPage />} />
          : <Route path="/calendar" element={ <CalendarPage />}/>
      }
      <Route path="*" element={ <Navigate to='/auth/login' />} />
    </Routes>
  )
}
