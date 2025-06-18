import { useDispatch, useSelector } from 'react-redux'
import SignupForm from '../../components/basic/SignupForm'
import type { SignupFormValues } from '../../constants/userTypes'
import type { AppDispatch } from '../../app/store'
import { signup } from '../../features/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { selectAuthStatus } from '../../features/auth/authSlice'
import { useEffect } from 'react'


const Signup = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const status = useSelector(selectAuthStatus)

  const handleSubmit = (data: SignupFormValues) => {
    console.log('signup')
    const { confirmPassword, ...rest } = data
    dispatch(signup(rest))
  }

  useEffect(() => {
    if (status === 'success') {
      navigate('/admin/')
    }
  }, [status])

  return (
    <main className='flex justify-center items-center min-h-screen '>
      <SignupForm
        title='Sign up'
        onSubmit={handleSubmit}
      />

    </main>
  )
}

export default Signup