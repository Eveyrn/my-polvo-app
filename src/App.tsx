
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddDish from "./components/add-dish/AddDish.tsx";
import DishPage from "./components/dish-page/DishPage.tsx";
import Home from "./components/Home.tsx";
import Header from "./components/header/Header.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-dish" element={<AddDish />} />
          <Route path="/dish/:dishId" element={<DishPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

