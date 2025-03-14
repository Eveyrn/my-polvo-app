
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IDishShort } from "../../types";
import axiosApi from "../../axiosApi";
import { CircularProgress } from "@mui/material";
import DishForm from "../../components/dish-form/DishForm";

const EditDish = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<IDishShort | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get(`/dishes/${id}.json`);


        if (response.headers['content-type'].includes('application/json')) {
          setDish(response.data); 
        } else {
          console.error('Unexpected response format:', response);

        }
      } catch (error) {
        console.error("Error fetching dish:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDish();
    }
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  const handleSubmit = async (dishData: IDishShort) => {
    try {
      setLoadingEdit(true);
      await axiosApi.put(`/dishes/${id}.json`, dishData);
      navigate("/"); 
    } catch (error) {
      console.error("Error updating dish:", error);
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <>
      {dish && (
        <DishForm
          dish={dish}
          onSubmit={handleSubmit}
          loading={loadingEdit}
        />
      )}
    </>
  );
};

export default EditDish;
