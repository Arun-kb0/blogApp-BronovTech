import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { selectAuthUser } from '../features/auth/authSlice'


const RequireAuth = () => {
  const user = useSelector(selectAuthUser)

  if (!user) {
    return <Navigate to='/login' replace />
  } else {
    return <Outlet />
  }


}

export default RequireAuth