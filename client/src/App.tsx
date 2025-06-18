import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import NavigationBar from './components/basic/NavigationBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import RequireAuth from './routes/RequireAuth';
import Home from './pages/user/Home';
import CreatePost from './pages/user/CreatePost';

const App = () => {
  const location = useLocation()
  const noNavPaths = ['/login', '/signup', '/admin/login']
  const [showNavbar, setShowNavbar] = useState(() => (
    !noNavPaths.includes(location.pathname)
  ))

  useEffect(() => {
    setShowNavbar(!noNavPaths.includes(location.pathname))
  }, [location.pathname])

  return (
    <>
      {showNavbar && <NavigationBar />}
      <ToastContainer theme='dark' />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreatePost />} />
        </Route>
      </ Routes>
    </>
  )
}

export default App