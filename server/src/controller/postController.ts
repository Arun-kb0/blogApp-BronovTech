import { NextFunction, Request, Response } from "express";
import HttpError from "../util/HttpError";
import httpStatus from "../constants/httpStatus";
import postModel from '../model/postModel'

const LIMIT = Number(process.env.LIMIT) || 10

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.query
    if (isNaN(Number(page))) throw new HttpError(httpStatus.BAD_REQUEST, 'page is required')

    const startIndex = (Number(page) - 1) * LIMIT
    const total = await postModel.countDocuments()
    const numberOfPages = Math.ceil(total / LIMIT)
    const posts = await postModel.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(LIMIT)
      .populate('author', 'id name')
    const data = {
      posts,
      currentPage: page,
      numberOfPages
    }
    res.status(httpStatus.OK).json(data)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, author } = req.body
    if (typeof title !== 'string' || typeof content !== 'string' || typeof author !== 'string') {
      throw new HttpError(httpStatus.BAD_REQUEST, 'title ,content and author are required')
    }
    const newPost = await postModel.create({ title, content, author })
    res.status(httpStatus.OK).json({ post: newPost })
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { title, content, author } = req.body
    if (typeof id !== 'string') {
      throw new HttpError(httpStatus.BAD_REQUEST, 'id is required')
    }
    const newPost = await postModel.findOneAndUpdate(
      { _id: id },
      { title, content },
      { new: true }
    ).populate('author', 'id name')
    res.status(httpStatus.OK).json({ post: newPost })
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deleted = await postModel.findOneAndDelete({ _id: id }, { new: true })
    if (!deleted) throw new Error('deletion failed')
    res.status(httpStatus.OK).json({ msg: 'Post deleted' })
  } catch (error) {
    next(error)
  }
}