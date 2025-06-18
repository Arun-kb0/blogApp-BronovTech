import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { StatusType } from "../../constants/types"
import type { RootState } from "../../app/store"
import type { postType } from "../../constants/formTypes"
import { createPost, deletePost, getPosts, updatePost } from "./postApi"

type FormStateType = {
  posts: postType[]
  currentPage: number
  numberOfPages: number
  getPostStatus: StatusType
  createPostStatus: StatusType
  error: string | undefined
}

const getInitState = (): FormStateType => ({
  posts: [],
  currentPage: 1,
  numberOfPages: 1,
  getPostStatus: 'idle',
  createPostStatus: 'idle',
  error: undefined
})

const initialState = getInitState()


const post = createSlice({
  name: "feedback",
  initialState,
  reducers: {

    setFeedbackToInitState: () => getInitState()

  },

  extraReducers: (builder) => {
    builder

      .addCase(createPost.pending, (state) => {
        state.createPostStatus = 'loading'
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<postType>) => {
        state.createPostStatus = 'success'
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPostStatus = 'failed'
        state.error = action.error.message
      })


      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload
        state.posts = state.posts.filter(item => item._id !== id)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message
      })

      .addCase(updatePost.fulfilled, (state, action: PayloadAction<postType>) => {
        const updatedPost = action.payload
        const index = state.posts.findIndex(item => item._id === updatedPost._id)
        if (index !== -1) {
          state.posts[index] = updatedPost
        } else {
          state.posts.push(updatedPost)
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.error.message
      })


      .addCase(getPosts.pending, (state) => {
        state.getPostStatus = 'loading'
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<{ posts: postType, currentPage: number, numberOfPages: number }>) => {
        state.getPostStatus = 'success'
        const { posts, currentPage, numberOfPages } = action.payload
        const newPosts = Array.isArray(posts) ? posts : [posts]
        const existingIds = new Set(state.posts.map(item => item._id))
        const uniquePosts = newPosts.filter(fb => !existingIds.has(fb._id))
        state.posts.push(...uniquePosts)
        state.currentPage = currentPage
        state.numberOfPages = numberOfPages
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.getPostStatus = 'failed'
        state.error = action.error.message
      })

  }

})

// Selectors
export const selectPost = (state: RootState) => state.post.posts
export const selectGetPostStatus = (state: RootState) => state.post.getPostStatus
export const selectCreatePostStatus = (state: RootState) => state.post.createPostStatus
export const selectFeedbackError = (state: RootState) => state.post.error

export const {
  setFeedbackToInitState
} = post.actions

export default post.reducer
