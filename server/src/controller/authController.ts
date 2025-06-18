import { NextFunction, Request, Response } from "express";
import HttpError from "../util/HttpError";
import httpStatus from "../constants/httpStatus";
import userModel from "../model/userModel";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret'
const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN || '1h'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body
    console.log(name, email, password)
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      throw new HttpError(httpStatus.BAD_REQUEST, 'name,email and password are required')
    }
    const foundUser = await userModel.findOne({ email })
    if (foundUser) throw new HttpError(httpStatus.CONFLICT, 'User already exits')

    const hashedPassword = await bcrypt.hash(password, 10)
    const userWithData = {
      name,
      email,
      password: hashedPassword,
    }
    const newUser = await userModel.create(userWithData)
    const accessToken = jwt.sign(
      { "email": email, "userId": newUser._id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: newUser._id },
      { accessToken: accessToken },
      { new: true, projection: { password: 0 } }
    )
    if (!updatedUser) throw new Error('Signup failed')

    res.status(httpStatus.OK).json({ user: updatedUser })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    console.log(email, password)
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new HttpError(httpStatus.BAD_REQUEST, 'name,email and password are required')
    }
    const foundUser = await userModel.findOne({ email })
    if (!foundUser) throw new HttpError(httpStatus.NOT_FOUND, 'User not found.')

    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) throw new HttpError(httpStatus.UNAUTHORIZED, 'Password miss match.')
    const accessToken = jwt.sign(
      { "email": email, "userId": foundUser._id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: foundUser._id },
      { accessToken: accessToken },
      { new: true, projection: { password: 0 } }
    )
    if (!updatedUser) throw new Error('Signup failed')

    res.status(httpStatus.OK).json({ user: updatedUser })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.query
    if (typeof accessToken !== 'string') throw new HttpError(httpStatus.NOT_FOUND, 'Logout success.')

    const foundUser = await userModel.findOne({ accessToken })
    if (!foundUser) throw new HttpError(httpStatus.NOT_FOUND, 'Logout success.')
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: foundUser._id },
      { accessToken: null },
      { new: true, projection: { password: 0 } }
    )
    res.status(httpStatus.OK).json({ status: 'success' })
  } catch (error) {
    next(error)
  }
} 