import { useState, useContext } from "react";
import { BasketContext } from "../basket/BasketContext";
import { IDishShort } from "../../types";
import axiosApi from "../../axiosApi";
import DishForm from "../dish-form/DishForm";
import { useNavigate } from "react-router-dom";

const AddDish = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("BasketContext is not provided. Wrap this component with BasketProvider.");
  }
  const { addDishToBasket } = context;

  const onAddDishClick = async (dishData: IDishShort) => {
    setLoading(true);
    try {
      await axiosApi.post("/dishes.json", dishData);
      addDishToBasket({ ...dishData, description: "Default description" });
      navigate("/");
    } catch (error) {
      console.error("Error adding dish:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Dish</h2>
      <DishForm onSubmit={onAddDishClick} loading={loading} />
    </div>
  );
};

export default AddDish;
