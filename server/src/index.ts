import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import httpLogger from './middleware/httpLogger'
import errorHandler from './middleware/errorHandler'

const PORT = process.env.PORT || 3001
const MONGO_DB_URI = process.env.MONGO_DB_URI || ''

const app = express()
app.use(cors())
app.use(express.json())

app.use(httpLogger)

app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'test route: server is running' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})