import { useEffect, useState } from 'react'
import Title from '../../components/basic/Title'
import type { BreadcrumbType } from '../../constants/types'
import PostCard from '../../components/user/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectPost, selectGetPostStatus } from '../../features/post/postSlice'
import {  getPosts } from '../../features/post/postApi'
import type { AppDispatch } from '../../app/store'


const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [breadcrumbs] = useState<BreadcrumbType[]>([
    { label: "Home", href: "/" },
  ])
  const post = useSelector(selectPost)
  const status = useSelector(selectGetPostStatus)

  useEffect(() => {
    dispatch(getPosts(1))
  },[])

  return (
    <main className='min-h-screen '>

      <div className='mt-20' >
        <Title
          title='Post'
          breadcrumbs={breadcrumbs}
        />
      </div>

      <div className='flex justify-center gap-1 flex-wrap'>
        {status === 'success' && post.map(item => (
          <PostCard post={item} />
        ))}
      </div>

    </main>
  )
}

export default Home