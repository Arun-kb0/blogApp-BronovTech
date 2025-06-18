import { useDispatch, useSelector } from 'react-redux'
import LoginForm from '../../components/basic/LoginForm'
import type { LoginFormValues } from '../../constants/userTypes'
import { login } from '../../features/auth/authApi'
import type { AppDispatch } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { selectAuthStatus } from '../../features/auth/authSlice'
import { useEffect } from 'react'


const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const status = useSelector(selectAuthStatus)

  const handleSubmit = (data: LoginFormValues) => {
    dispatch(login(data))
  }

  useEffect(() => {
    if (status === 'success') {
      navigate('/')
    }
  },[status])

  return (
    <main className='flex justify-center items-center min-h-screen '>
      <LoginForm
        title='Sign In'
        isAdmin={false}
        onSubmit={handleSubmit}
      />

    </main>
  )
}

export default Login