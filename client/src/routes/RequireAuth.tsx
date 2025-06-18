import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectAuthStatus, selectAuthUser } from '../features/auth/authSlice'


const RequireAuth = () => {
  const user = useSelector(selectAuthUser)
  const status = useSelector(selectAuthStatus)


  if (status === 'loading') {
    return <div>Loading...</div>; // Display a loading spinner or message
  }

  if (status === 'failed') {
    return <Navigate to="/login" replace />; // Redirect only when authentication fails
  }

  if (status === 'success' && user) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;

}

export default RequireAuth