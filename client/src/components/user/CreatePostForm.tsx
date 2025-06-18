
import { useForm } from 'react-hook-form'
import { Button, Input } from '@material-tailwind/react'
import type { postType } from '../../constants/formTypes'

type Props = {
  post?: postType
  handleSubmittedValues: (data: any) => void
}

type FormType = {
  title: string
  content: string
}

const CreatePostForm = ({ handleSubmittedValues , post}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormType>({
    defaultValues: post
      ? { title: post.title, content: post.content }
      : undefined
  })

  const onSubmit = (data: any) => {
    handleSubmittedValues(data)
    reset()
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">

      <div>
        <Input
          id="title"
          color="secondary"
          size="lg"
          type="title"
          className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
          {...register("title", {
            required: "Title is required",
            validate: value => typeof value === "string" || "Only strings are allowed",
          })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Input
          id="content"
          color="secondary"
          size="lg"
          type="content"
          className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
          {...register("content", {
            required: "Content is required",
            validate: value => typeof value === "string" || "Only strings are allowed",
          })}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>


      <Button type="submit" variant="gradient" >
        create post
      </Button>
    </form>
  )
}

export default CreatePostForm