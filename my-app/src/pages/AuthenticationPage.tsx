import { Navigate, Outlet } from 'react-router-dom'
import { getCurrentUser } from '../config/auth'

const AuthenticationPage = () => {
  const currentuser = getCurrentUser()
  return currentuser ? <Outlet></Outlet> : <Navigate to="/sign-in" />
}

export default AuthenticationPage
