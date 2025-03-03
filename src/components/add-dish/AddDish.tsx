import { useState } from "react";
import { IDishShort } from "../../types";
import axiosApi from "../../axiosApi";
import DishForm from "../dish-form/DishForm";
import { useNavigate } from "react-router-dom";

const AddDish = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onAddDishClick = async (dishData: IDishShort) => {
    setLoading(true);
    try {
      await axiosApi.post("/dishes.json", dishData);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Добавить блюдо</h2>
      <DishForm onSubmit={onAddDishClick} loading={loading} />
    </div>
  );
};

export default AddDish;
