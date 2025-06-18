import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserType } from "../../constants/userTypes";
import errorHandler from "../../util/errorHandler";
import { axiosInstance } from "../../config/axiosInstance";
import type { AppDispatch, RootState } from "../../app/store";
import { setAuthToInitState } from "./authSlice";

type SignupArgsType = Pick<UserType, 'email' | 'password'> & UserType['profile']
export const signup = createAsyncThunk('/signup', async (user: SignupArgsType) => {
  try {
    const res = await axiosInstance.post('/auth/signup', user)
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

type LoginArgsType = Pick<UserType, 'email' | 'password'>
export const login = createAsyncThunk('/login', async (data: LoginArgsType) => {
  try {
    const res = await axiosInstance.post('/auth/login', data)
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const logout = createAsyncThunk('/logout', async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const dispatchFunction = dispatch as AppDispatch
    const accessToken = state.auth.accessToken
    const res = await axiosInstance.get(`/auth/logout?accessToken=${accessToken}`)
    dispatchFunction(setAuthToInitState())
    localStorage.clear()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})
