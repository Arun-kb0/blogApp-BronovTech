import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import type { postType } from "../../constants/formTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "../../features/post/postApi";
import type { AppDispatch } from "../../app/store";

type Props = {
  post: postType
}

const PostCard = ({ post }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    dispatch(deletePost(post._id))
  }
  const handleUpdate = () => {
    navigate('/create', { state: { post } })
  }

  return (
    <Card className="w-96">
      <CardHeader floated={false} className="flex justify-center">
        <div>
          <Typography variant="h4" className="mb-2 text-xl font-bold">
            {post.title}
          </Typography>
          <Typography variant="p" className="mb-2 text-sm ">
            author : {post?.author?.name ? post.author.name : ''}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="text-center">
        {post.content}
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Button variant="outline" onClick={handleDelete}>Delete</Button>
        <Button variant="outline" onClick={handleUpdate}>Update</Button>
      </CardFooter>
    </Card>
  );
}

export default PostCard