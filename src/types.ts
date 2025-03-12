

  export interface IDishesList { 
    [id: string]: IDishShort;
  }
  
export interface IDish {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IDishShort {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface IBasketItem {
  dish: IDish;
  count: number;
}

export interface IBasketState {
  items: IBasketItem[];
  totalCount: number;
  totalPrice: number;
}

export interface IBasketContext {
  basket: IBasketState;
  addDishToBasket: (dish: IDish) => void;
  removeDishFromBasket: (dishId: string) => void;
  setBasketState: React.Dispatch<React.SetStateAction<IBasketState>>; // Добавляем метод для обновления состояния корзины
}
