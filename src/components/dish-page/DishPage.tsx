import{ useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { IDish } from '../../types';
import { Button, CircularProgress, Typography } from '@mui/material';
import './DishPage.css';

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
    navigate('/');
  };

  if (loading) return <CircularProgress />;
  if (!dish) return <Typography>Dish not found</Typography>;

  return (
    <div className="dish-details">
      <Typography variant="h4" className="dish-details-title">{dish.name}</Typography>
      <Typography className="dish-details-description">{dish.description}</Typography>
      <Typography className="dish-details-price">{dish.price} KGS</Typography>
      <Button variant="contained" color="error" onClick={deleteDish} className="dish-delete-button">
        Delete
      </Button>
    </div>
  );
};

export default DishPage;
