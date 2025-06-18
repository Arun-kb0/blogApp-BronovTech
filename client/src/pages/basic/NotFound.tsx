import { Button } from '@material-tailwind/react'
import notFoundImage from '../../assets/images/notFoundImage.jpg'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(-1)
  }

  return (
    <main className='min-h-screen flex justify-center items-center'>
      <div className="flex flex-col items-center">
        <img
          src={notFoundImage}
          alt="Not Found"
          className="w-72 h-72 object-contain mb-8 rounded-lg"
        />
        <div className="flex justify-center items-center">
          <Button variant="gradient" onClick={handleNavigate}>
            Go back
          </Button>
        </div>
      </div>
    </main>
  )
}

export default NotFound