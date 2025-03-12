
//maybe this one could work
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import { IDishShort } from "../../types";
// import axiosApi from "../../axiosApi";
// import { CircularProgress } from "@mui/material";
// import DishForm from "../../components/dish-form/DishForm";

// const EditDish = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [dish, setDish] = useState<IDishShort | null>(null); // Default is null
//   const [loading, setLoading] = useState(false);
//   const [loadingEdit, setLoadingEdit] = useState(false);

//   useEffect(() => {
//     const fetchDish = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosApi.get<IDishShort>(`/dishes/${id}.json`);
//         if (!data) throw new Error("Dish not found");
//         setDish(data);
//       } catch (error) {
//         console.error("Error fetching dish:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchDish();
//     }
//   }, [id]);

//   if (loading) {
//     return <CircularProgress />; // Loading spinner while fetching
//   }

//   const handleSubmit = async (dishData: IDishShort) => {
//     try {
//       setLoadingEdit(true);
//       await axiosApi.put(`/dishes/${id}.json`, dishData);
//       navigate("/"); // Navigate back after successfully updating the dish
//     } catch (error) {
//       console.error("Error updating dish:", error);
//     } finally {
//       setLoadingEdit(false);
//     }
//   };

//   return (
//     <>
//       {dish && <DishForm dish={dish} onSubmit={handleSubmit} loading={loadingEdit} />}
//     </>
//   );
// };

// export default EditDish;


// EditDish.tsx

// import  { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import { IDishShort } from "../../types";
// import axiosApi from "../../axiosApi";
// import { CircularProgress } from "@mui/material";
// import DishForm from "../../components/dish-form/DishForm";

// const EditDish = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [dish, setDish] = useState<IDishShort | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [loadingEdit, setLoadingEdit] = useState(false);

//   useEffect(() => {
//     const fetchDish = async () => {
//       try {
//         setLoading(true);
//         const response = await axiosApi.get(`/dishes/${id}.json`);
        
//         // Check if the response content type is application/json
//         if (response.headers['content-type'].includes('application/json')) {
//           setDish(response.data); // If it's JSON, set the dish state
//         } else {
//           console.error('Unexpected response format:', response);
//         }
//       } catch (error) {
//         console.error("Error fetching dish:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchDish();
//     }
//   }, [id]);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   const handleSubmit = async (dishData: IDishShort) => {
//     try {
//       setLoadingEdit(true);
//       await axiosApi.put(`/dishes/${id}.json`, dishData);
//       navigate("/"); // Navigate back after successfully updating the dish
//     } catch (error) {
//       console.error("Error updating dish:", error);
//     } finally {
//       setLoadingEdit(false);
//     }
//   };

//   return (
//     <>
//       {dish && (
//         <DishForm
//           dish={dish}
//           onSubmit={handleSubmit}
//           loading={loadingEdit}
//         />
//       )}
//     </>
//   );
// };

// export default EditDish;


// EditDish.tsx

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
      navigate("/"); // Перенаправляем после успешного обновления блюда
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
