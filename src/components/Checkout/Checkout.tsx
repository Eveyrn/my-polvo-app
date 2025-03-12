import { useState, useContext } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { BasketContext } from "../basket/BasketContext";  
import "./checkout.css";  

const Checkout = () => {
  const { basket } = useContext(BasketContext);
  if (!basket) {
  
    return <Typography>Basket is empty</Typography>;
  }

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      basket, 
      deliveryDetails, 
    };

    setLoading(true);

    try {
      await axiosApi.post("/orders.json", orderData); 
      navigate("/"); 
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container className="checkout-container">
      <Typography variant="h4" className="checkout-title">
        Checkout
      </Typography>

      <Box className="order-summary">
        <Typography variant="h6">Order Summary</Typography>
        {basket.items.map((item) => (
          <Box key={item.dish.id} className="order-item">
            <Typography>{item.dish.name}</Typography>
            <Typography>
              {item.count} x {item.dish.price} KGS
            </Typography>
          </Box>
        ))}
        <Typography variant="h6" className="total-price">
          Total Price: {basket.totalPrice} KGS
        </Typography>
      </Box>

      <Box className="delivery-details">
        <Typography variant="h6">Delivery Details</Typography>
        <TextField
          label="Name"
          name="name"
          value={deliveryDetails.name}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address"
          name="address"
          value={deliveryDetails.address}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={deliveryDetails.phone}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
      </Box>

      <Button
        variant="contained"
        onClick={handlePlaceOrder}
        disabled={loading}
        className="place-order-button"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
    </Container>
  );
};

export default Checkout;
