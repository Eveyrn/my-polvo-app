import React, { useState, useEffect, useContext } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { BasketContext } from '../components/basket/BasketContext';
import { IDish, IDishesList } from '../types';
import DishCard from '../components/dish-card/DishCard';
import axiosApi from '../axiosApi';
import { syncBasketWithDishes } from '../components/utils/basketHelpers';

const Home: React.FC = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState(false);

  const context = useContext(BasketContext);

  if (!context) {
    throw new Error("BasketContext is not provided. Wrap this component with BasketProvider.");
  }

  const { addDishToBasket, setBasketState } = context;

  const handleSyncBasketWithDishes = (dishes: IDish[]) => {
    setBasketState((currentState: any) => syncBasketWithDishes(currentState, dishes));
  };

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<IDishesList>('/dishes.json');
      const dishesData = response.data;

      const dishesArray = Object.keys(dishesData).map((key) => ({ ...dishesData[key], id: key }));
      setDishes(dishesArray);

      handleSyncBasketWithDishes(dishesArray);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Menu
      </Typography>

      {dishes.length === 0 && <Typography>No dishes found.</Typography>}

      <Box display="flex" flexWrap="wrap" gap={2}>
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} addDishToBasket={addDishToBasket} />
        ))}
      </Box>
    </div>
  );
};

export default Home;

