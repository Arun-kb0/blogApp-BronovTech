import { NextFunction, Response } from "express";
import HttpError from '../util/HttpError'
import httpStatus from '../constants/httpStatus'
import { AuthRequest } from "../constants/apiTypes";
import verifyToken from '../util/verifyToken'

const authorize = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) throw new HttpError(httpStatus.UNAUTHORIZED, 'Token not found')
    const token = authHeader.split(' ')[1]
    const { status, msg, data } = verifyToken(token)
    if (status !== httpStatus.OK || !data) throw new HttpError(status, msg)
    const { email, userId } = data
    if (typeof userId !== 'string' || typeof email !== 'string') throw new HttpError(status, 'username and userId not found in token.')
    
    req.email = email
    req.userId = userId
    next()
  } catch (error) {
    next(error)
  }
}


export default authorize