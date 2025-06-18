import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../config/axiosInstance"
import errorHandler from "../../util/errorHandler"
import type { RootState } from "../../app/store"
import type { postType } from "../../constants/formTypes"


type CreatePostArgs = Pick<postType, 'title' | 'content'>
export const createPost = createAsyncThunk('/create-posts', async (data: CreatePostArgs, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken, user } = state.auth
    const res = await axiosInstance.post('/post/', { ...data, author: user?._id }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const getPosts = createAsyncThunk('/get-posts', async (page: number, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const res = await axiosInstance.get(`/post?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

type UpdatePostArgs = Pick<postType, '_id' | 'title' | 'content'>
export const updatePost = createAsyncThunk('/update-post', async (data: UpdatePostArgs, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const res = await axiosInstance.patch(`/post/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const deletePost = createAsyncThunk('/delete-post', async (id: string, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const res = await axiosInstance.delete(`/post/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return id
  } catch (error) {
    return errorHandler(error)
  }
})