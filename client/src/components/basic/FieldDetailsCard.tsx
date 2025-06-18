import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import type { ConfigFieldType } from "../../constants/formTypes";

type Props = {
  field: ConfigFieldType
  handleDelete: (id:string) => void
}

const FieldDetailsCard = ({ field, handleDelete }: Props) => {

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <div className="flex gap-2">
          <Typography variant="h5" className="mb-2 font-bold">
            id : 
          </Typography>
          <Typography variant="h5" className="mb-2">
            {field.id}
          </Typography>
        </div>
        <div className="flex gap-2">
          <Typography variant="h5" className="mb-2 font-bold">
            label :
          </Typography>
          <Typography variant="h5" className="mb-2">
            {field.label}
          </Typography>
        </div>
        <div className="flex gap-2">
          <Typography variant="h5" className="mb-2 font-bold">
            type : 
          </Typography>
          <Typography variant="h5" className="mb-2">
            {field.type}
          </Typography>
        </div>
        <div className="flex gap-2">
          <Typography variant="h5" className="mb-2 font-bold">
            required : 
          </Typography>
          <Typography variant="h5" className="mb-2">
            {field.required ? 'true' : 'false'}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex justify-center">
        <Button variant='outline' onClick={() => handleDelete(field.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FieldDetailsCard