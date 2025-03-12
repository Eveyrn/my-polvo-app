import { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { IDishShort } from "../../types";

interface Props {
  onSubmit: (dishData: IDishShort) => void;
  loading: boolean;
  dish?: IDishShort; 
}

const INITIAL_FORM_STATE: IDishShort = {
  name: "",
  description: "",
  price: 0,
  id: ""
};

const DishForm = ({ onSubmit, loading, dish }: Props) => {
  const [formState, setFormState] = useState<IDishShort>(dish || INITIAL_FORM_STATE);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
        margin: "0 auto"
      }}
      onSubmit={onFormSubmit}
    >
      <TextField
        label="Название"
        name="name"
        value={formState.name}
        onChange={inputChangeHandler}
        required
      />
      <TextField
        label="Описание"
        name="description"
        value={formState.description}
        onChange={inputChangeHandler}
        required
      />
      <TextField
        label="Цена"
        name="price"
        type="number"
        value={formState.price}
        onChange={inputChangeHandler}
        required
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Добавляется..." : "Добавить блюдо"}
      </Button>
    </form>
  );
};

export default DishForm;


