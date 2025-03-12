// // In Checkout.tsx
// import { useState } from 'react';
// import { Box, Container, Typography, Button, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axiosApi from '../../axiosApi';
// import { IBasketState } from '../../types';

// const Checkout = ({ basketState }: { basketState: IBasketState }) => {
//   const [deliveryDetails, setDeliveryDetails] = useState({
//     name: '',
//     address: '',
//     phone: '',
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setDeliveryDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handlePlaceOrder = async () => {
//     const orderData = {
//       basket: basketState,
//       deliveryDetails,
//     };

//     try {
//       await axiosApi.post('/orders.json', orderData);
//       navigate('/order-success');  // Navigate to order success page
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" sx={{ mb: 2 }}>Checkout</Typography>
      
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h6">Order Summary</Typography>
//         {basketState.items.map((item) => (
//           <Box key={item.dish.id} display="flex" justifyContent="space-between">
//             <Typography>{item.dish.name}</Typography>
//             <Typography>{item.count} x {item.dish.price} KGS</Typography>
//           </Box>
//         ))}
//         <Typography variant="h6" sx={{ mt: 2 }}>Total Price: {basketState.totalPrice} KGS</Typography>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h6">Delivery Details</Typography>
//         <TextField
//           label="Name"
//           name="name"
//           value={deliveryDetails.name}
//           onChange={handleInputChange}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Address"
//           name="address"
//           value={deliveryDetails.address}
//           onChange={handleInputChange}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Phone"
//           name="phone"
//           value={deliveryDetails.phone}
//           onChange={handleInputChange}
//           fullWidth
//           required
//         />
//       </Box>

//       <Button variant="contained" onClick={handlePlaceOrder}>Place Order</Button>
//     </Container>
//   );
// };

// export default Checkout;


// import { useState, useContext } from "react";
// import { Box, Container, Typography, Button, TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axiosApi from "../../axiosApi";
// import { BasketContext } from "../basket/BasketContext";  // Импортируем контекст

// const Checkout = () => {
//   const { basket } = useContext(BasketContext); // Получаем данные корзины через контекст

//   if (!basket) {
//     // Если basket пустой, отображаем ошибку или редирект
//     return <Typography>Basket is empty</Typography>;
//   }

//   const [deliveryDetails, setDeliveryDetails] = useState({
//     name: "",
//     address: "",
//     phone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setDeliveryDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handlePlaceOrder = async () => {
//     const orderData = {
//       basket, // Отправляем состояние корзины
//       deliveryDetails,
//     };

//     setLoading(true);

//     try {
//       await axiosApi.post("/orders.json", orderData);
//       navigate("/order-success"); // Перенаправляем на страницу успешного оформления заказа
//     } catch (error) {
//       console.error("Error placing order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Checkout
//       </Typography>

//       {/* Секция с итогом заказа */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h6">Order Summary</Typography>
//         {basket.items.map((item) => (
//           <Box key={item.dish.id} display="flex" justifyContent="space-between">
//             <Typography>{item.dish.name}</Typography>
//             <Typography>
//               {item.count} x {item.dish.price} KGS
//             </Typography>
//           </Box>
//         ))}
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Total Price: {basket.totalPrice} KGS
//         </Typography>
//       </Box>

//       {/* Секция с данными для доставки */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h6">Delivery Details</Typography>
//         <TextField
//           label="Name"
//           name="name"
//           value={deliveryDetails.name}
//           onChange={handleInputChange}
//           fullWidth
//           required
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Address"
//           name="address"
//           value={deliveryDetails.address}
//           onChange={handleInputChange}
//           fullWidth
//           required
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Phone"
//           name="phone"
//           value={deliveryDetails.phone}
//           onChange={handleInputChange}
//           fullWidth
//           required
//           sx={{ mb: 2 }}
//         />
//       </Box>

//       {/* Кнопка для оформления заказа */}
//       <Button
//         variant="contained"
//         onClick={handlePlaceOrder}
//         disabled={loading}
//       >
//         {loading ? "Placing Order..." : "Place Order"}
//       </Button>
//     </Container>
//   );
// };

// export default Checkout;



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
      basket, // Отправляем состояние корзины
      deliveryDetails, // Данные о доставке
    };

    setLoading(true); // Показываем индикатор загрузки

    try {
      await axiosApi.post("/orders.json", orderData); // Отправляем запрос на создание заказа в Firebase
      navigate("/"); // Перенаправляем на главную страницу после успешного оформления заказа
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false); // Убираем индикатор загрузки после завершения
    }
  };

  return (
    <Container className="checkout-container">
      <Typography variant="h4" className="checkout-title">
        Checkout
      </Typography>

      {/* Секция с итогом заказа */}
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

      {/* Секция с данными для доставки */}
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

      {/* Кнопка для оформления заказа */}
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
