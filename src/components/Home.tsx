import { useEffect, useState } from "react";
import { IDish, IDishesList } from "../types";
import axiosApi from "../axiosApi";
import DishCard from "../components/dish-card/DishCard";
import { Box, CircularProgress, Typography } from "@mui/material";

const Home = () => { 
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => { 
      try { 
        setLoading(true);  
        const dishesResponse = await axiosApi.get<IDishesList | null>("/dishes.json");

        if (!dishesResponse.data) {
          setDishes([]);
          return;
        }

        const newDishes: IDish[] = Object.keys(dishesResponse.data).map((key) => ({
          id: key,
          ...dishesResponse.data[key],
        }));

        setDishes(newDishes);
      } finally { 
        setLoading(false); 
      } 
    };

    fetchDishes();
  }, []);

  return ( 
    <div style={{ padding: "20px" }}> 
      <Typography variant="h4" gutterBottom>Menu</Typography>

      {loading && <CircularProgress />} 

      {!loading && dishes.length === 0 && <Typography>No dishes found.</Typography>}

      {!loading && dishes.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </Box>
      )}
    </div> 
  ); 
};

export default Home;
