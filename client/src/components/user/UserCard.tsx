import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";
import type { UserType } from "../../constants/userTypes";
import { useNavigate } from "react-router-dom";

type Props = {
  user: UserType
}

const UserCard = ({ user }: Props) => {
  const navigate = useNavigate()

  const handleGiveFeedback = () => {
    navigate('/write', { state: user })
  }

  return (
    <Card className="w-96">
      <CardHeader floated={false} className="h-32 flex justify-center">
        <UserIcon className="h-32" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" className="mb-2">
          {user.profile.firstName} {user.profile.lastName}
        </Typography>
        <Typography className="font-medium" textGradient>
          {user.profile.department} : {user.profile.designation}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Button variant="outline">
          Ask feedback
        </Button>
        <Button variant="outline" onClick={handleGiveFeedback}>
          Give feedback
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserCard