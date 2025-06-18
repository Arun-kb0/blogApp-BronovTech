import { useState } from 'react'
import Title from '../../components/basic/Title'
import type { BreadcrumbType } from '../../constants/types'
import CreatePostForm from '../../components/user/CreatePostForm'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import { selectAuthUser } from '../../features/auth/authSlice'
import { createPost, updatePost } from '../../features/post/postApi'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'


const CreatePost = () => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const [breadcrumbs] = useState<BreadcrumbType[]>([
    { label: "Home", href: "/" },
    { label: "Create", href: '/create' }
  ])
  const  post  = location?.state?.post
  const currentUser = useSelector(selectAuthUser)

  const handleSubmitFeedback = (data: { title: string, content: string }) => {
    if (!currentUser) return
    if (post) {
      dispatch(updatePost({ _id: post._id, ...data }))
      toast('Post updated.')
    } else {
      dispatch(createPost(data))
      toast('Post created.')
    }
  }

  return (
    <main className='min-h-screen'>
      <div className='mt-20'>
        <Title
          title='Create post'
          breadcrumbs={breadcrumbs}
        />
      </div>
      <div className='flex justify-center'>
        <CreatePostForm
          post={post}
          handleSubmittedValues={handleSubmitFeedback}
        />
      </div>

    </main>
  )
}

export default CreatePost