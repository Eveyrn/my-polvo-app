// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AddDish from "./components/add-dish/AddDish";
// import DishPage from "./components/dish-page/DishPage";
// import Home from "./components/Home";
// import Header from "./components/header/Header";
// import EditDish from "./components/edit-dish/EditDish";
// import { BasketProvider } from "./components/basket/BasketContext"; 
// import Basket from "./components/basket/Basket";


// function App() {
//   return (
//     <BrowserRouter>
//       <BasketProvider>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/add-dish" element={<AddDish />} />
//           <Route path="/dish/:dishId" element={<DishPage />} />
//           <Route path="/edit-dish/:id" element={<EditDish />} />
//           <Route path="/basket" element={<Basket />} />
//         </Routes>
//       </BasketProvider>
//     </BrowserRouter>
//   );
// }

// export default App;


// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AddDish from "./components/add-dish/AddDish";
// import DishPage from "./components/dish-page/DishPage";
// import Home from "./components/Home";
// import Header from "./components/header/Header";
// import EditDish from "./components/edit-dish/EditDish";
// import { BasketProvider } from "./components/basket/BasketContext"; 
// import Basket from "./components/basket/Basket";
// import Checkout from "./components/Checkout/Checkout";  // Импортируем компонент Checkout

// function App() {
//   return (
//     <BrowserRouter>
//       <BasketProvider>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/add-dish" element={<AddDish />} />
//           <Route path="/dish/:dishId" element={<DishPage />} />
//           <Route path="/edit-dish/:id" element={<EditDish />} />
//           <Route path="/basket" element={<Basket />} />
//           <Route path="/check-out" element={<Checkout />} />

//         </Routes>
//       </BasketProvider>
//     </BrowserRouter>
//   );
// }

// export default App;



// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AddDish from "./components/add-dish/AddDish";
// import DishPage from "./components/dish-page/DishPage";
// import Home from "./components/Home";
// import Header from "./components/header/Header";
// import EditDish from "./components/edit-dish/EditDish";
// import { BasketProvider } from "./components/basket/BasketContext"; 
// import Basket from "./components/basket/Basket";
// import Checkout from "./components/Checkout/Checkout";  // Импортируем компонент Checkout

// function App() {
//   return (
//     <BrowserRouter>
//       <BasketProvider>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/add-dish" element={<AddDish />} />
//           <Route path="/dish/:dishId" element={<DishPage />} />
//           <Route path="/edit-dish/:id" element={<EditDish />} />
//           <Route path="/basket" element={<Basket />} />
//           <Route path="/check-out" element={<Checkout />} />  {/* Убедитесь, что Checkout оборачивается в BasketProvider */}
//         </Routes>
//       </BasketProvider>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddDish from "./components/add-dish/AddDish";
import DishPage from "./components/dish-page/DishPage";
import Home from "./components/Home";
import Header from "./components/header/Header";
import EditDish from "./components/edit-dish/EditDish";
import { BasketProvider } from "./components/basket/BasketContext"; 
import Basket from "./components/basket/Basket";
import Checkout from "./components/Checkout/Checkout";  // Импортируем компонент Checkout

function App() {
  return (
    <BrowserRouter>
      <BasketProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-dish" element={<AddDish />} />
          <Route path="/dish/:dishId" element={<DishPage />} />
          <Route path="/edit-dish/:id" element={<EditDish />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/check-out" element={<Checkout />} />  {/* Убедитесь, что Checkout оборачивается в BasketProvider */}
        </Routes>
      </BasketProvider>
    </BrowserRouter>
  );
}

export default App;
