import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Paper } from '@mui/material';
import { IDish } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  dish: IDish;
  addDishToBasket: (dish: IDish) => void;
}

const DishCard: React.FC<Props> = ({ dish, addDishToBasket }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ padding: '10px' }}>
      <Paper sx={{ padding: 2, boxShadow: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {dish.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dish.price} KGS
            </Typography>
          </CardContent>

          <Grid container justifyContent="space-between" sx={{ padding: 2 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => addDishToBasket(dish)}
              sx={{ width: '45%' }}
            >
              Add to Basket
            </Button>

            <Link to={`/dish/${dish.id}`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="small" sx={{ width: '45%' }}>
                View Details
              </Button>
            </Link>
          </Grid>
        </Card>
      </Paper>
    </Grid>
  );
};

export default DishCard;


