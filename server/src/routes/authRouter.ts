import express from 'express'
const router = express.Router()
import { login, logout, signup } from '../controller/authController'

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

export default router