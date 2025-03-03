import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { IDish } from "../../types";
import { Button, CircularProgress, Typography } from "@mui/material";

const DishPage = () => {
  const { dishId } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState<IDish | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axiosApi.get<IDish | null>(`/dishes/${dishId}.json`);
        setDish(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [dishId]);

  const deleteDish = async () => {
    await axiosApi.delete(`/dishes/${dishId}.json`);
    navigate("/");
  };

  if (loading) return <CircularProgress />;
  if (!dish) return <Typography>Блюдо не найдено</Typography>;

  return (
    <div>
      <Typography variant="h4">{dish.name}</Typography>
      <Typography>{dish.description}</Typography>
      <Typography>{dish.price} KGS</Typography>
      <Button variant="contained" color="error" onClick={deleteDish}>
        Удалить блюдо
      </Button>
    </div>
  );
};

export default DishPage;
