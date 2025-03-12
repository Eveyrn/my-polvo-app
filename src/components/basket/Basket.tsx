import React, { useContext } from 'react';
import { BasketContext } from '../basket/BasketContext';
import { Box, Typography, Button, Paper, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Basket: React.FC = () => {
  const context = useContext(BasketContext);

  if (!context) {
    throw new Error('BasketContext is undefined. Make sure you are using it inside BasketProvider.');
  }

  const { basket, removeDishFromBasket } = context;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Basket
      </Typography>

      {basket.items.length === 0 ? (
        <Typography>No items in the basket</Typography>
      ) : (
        <Box>
          {basket.items.map((item) => (
            <Paper key={item.dish.id} sx={{ padding: 2, marginBottom: 2 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={8}>
                  <Typography variant="h6">{item.dish.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.dish.description}
                  </Typography>
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="flex-end">
                  <Typography variant="body1">
                    {item.count} x {item.dish.price} KGS
                  </Typography>
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeDishFromBasket(item.dish.id)}
                    sx={{ padding: '6px 12px' }}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
              <Divider sx={{ marginY: 1 }} />
            </Paper>
          ))}

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Total: {basket.totalPrice} KGS</Typography>
            <Link to="/check-out">
              <Button variant="contained" color="primary">
                Order
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Basket;
