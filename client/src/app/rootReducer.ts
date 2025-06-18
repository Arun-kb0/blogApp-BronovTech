import { combineReducers, type AnyAction } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'

const appReducer = combineReducers({
  auth: authReducer,
  post: postReducer
})

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'resetStore') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer