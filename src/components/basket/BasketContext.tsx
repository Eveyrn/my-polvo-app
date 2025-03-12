import React, { createContext, useState, ReactNode } from 'react';
import { IBasketContext, IBasketState, IDish, IBasketItem } from '../../types';

const BasketContext = createContext<IBasketContext | undefined>(undefined);

interface BasketProviderProps {
  children: ReactNode;
}

const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const savedBasket = localStorage.getItem('basket');
  const initialBasket: IBasketState = savedBasket ? JSON.parse(savedBasket) : {
    items: [],
    totalCount: 0,
    totalPrice: 0,
  };

  const [basket, setBasket] = useState<IBasketState>(initialBasket);

  const saveBasketToLocalStorage = (basket: IBasketState) => {
    localStorage.setItem('basket', JSON.stringify(basket));
  };

  const addDishToBasket = (dish: IDish) => {
    const existingItemIndex = basket.items.findIndex(item => item.dish.id === dish.id);
    let newItems: IBasketItem[];

    if (existingItemIndex !== -1) {
      newItems = basket.items.map((item, index) =>
        index === existingItemIndex ? { ...item, count: item.count + 1 } : item
      );
    } else {
      newItems = [...basket.items, { dish, count: 1 }];
    }

    const totalCount = newItems.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = newItems.reduce((sum, item) => sum + item.dish.price * item.count, 0);

    const updatedBasket = { items: newItems, totalCount, totalPrice };
    setBasket(updatedBasket);
    saveBasketToLocalStorage(updatedBasket); 
    console.log('Updated basket:', updatedBasket); 
  };

  const removeDishFromBasket = (dishId: string) => {
    const updatedItems = basket.items.filter(item => item.dish.id !== dishId);

    const totalCount = updatedItems.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = updatedItems.reduce((sum, item) => sum + item.dish.price * item.count, 0);

    const updatedBasket = { items: updatedItems, totalCount, totalPrice };
    setBasket(updatedBasket);
    saveBasketToLocalStorage(updatedBasket); 
    console.log('Updated basket after removal:', updatedBasket); 
  };

  return (
    <BasketContext.Provider value={{ basket, addDishToBasket, removeDishFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export { BasketContext, BasketProvider };

