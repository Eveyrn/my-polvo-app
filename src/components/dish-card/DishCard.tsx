import { Card, CardContent, Typography } from "@mui/material";
import { IDish } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  dish: IDish;
}

const DishCard = ({ dish }: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 300, margin: 2, cursor: "pointer" }} onClick={() => navigate(`/dish/${dish.id}`)}>
      <CardContent>
        <Typography variant="h6">{dish.name}</Typography>
        <Typography variant="body1">{dish.price} KGS</Typography>
      </CardContent>
    </Card>
  );
};

export default DishCard;

