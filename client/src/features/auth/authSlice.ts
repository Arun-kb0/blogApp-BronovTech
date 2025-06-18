import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { StatusType } from "../../constants/types"
import type { UserType } from "../../constants/userTypes"
import { login, logout, signup } from "./authApi"
import type { RootState } from "../../app/store"

type AuthStateType = {
  user: UserType | undefined
  accessToken: string | undefined
  status: StatusType
  logoutStatus: StatusType
  error: string | undefined
}

const getUserFromStorage = () => {
  try {
    const userString = localStorage.getItem('user')
    if (!userString) return undefined
    const user = JSON.parse(userString)
    return user ? user : undefined
  } catch (error) {
    return undefined
  }
}

const getAccessTokenFromStorage = () => {
  const token = localStorage.getItem('accessToken')
  return token ? token : undefined
}

const setUserAndAccessTokenInStorage = (user: UserType, accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('user', JSON.stringify(user))
}

const getInitState = (): AuthStateType => ({
  user: getUserFromStorage(),
  accessToken: getAccessTokenFromStorage(),
  status: 'idle',
  logoutStatus: 'idle',
  error: undefined
})

const initialState = getInitState()


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setAuthToInitState: () => getInitState()

  },

  extraReducers: (builder) => {
    builder

      .addCase(signup.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ user: UserType, accessToken: string }>) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.user = user
        state.accessToken = accessToken
        setUserAndAccessTokenInStorage(user, accessToken)
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: UserType, accessToken: string }>) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.user = user
        state.accessToken = accessToken
        setUserAndAccessTokenInStorage(user, accessToken)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(logout.fulfilled, (state) => {
        
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message
      })

  }
})

export const selectAuthUser = (state: RootState) => state.auth.user
export const selectAuthAccessToken = (state: RootState) => state.auth.accessToken
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthLogoutStatus = (state: RootState) => state.auth.logoutStatus

export const {
  setAuthToInitState
} = authSlice.actions

export default authSlice.reducer
