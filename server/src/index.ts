import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import connectDb from './config/connectDb'
import httpLogger from './middleware/httpLogger'
import errorHandler from './middleware/errorHandler'
import authRouter from './routes/authRouter'
import postRouter from './routes/postRouter'

const PORT = process.env.PORT || 3001
const MONGO_DB_URI = process.env.MONGO_DB_URI || ''

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use(httpLogger)

app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'test route: server is running' })
})

app.use('/auth', authRouter)
app.use('/post', postRouter)

app.use(errorHandler)

connectDb(MONGO_DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(error => console.log(error))