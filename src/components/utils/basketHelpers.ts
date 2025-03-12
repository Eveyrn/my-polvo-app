import { IBasketState, IDish, IBasketItem } from '../../types';

export const addDishToBasket = (currentState: IBasketState, dish: IDish): IBasketState => {
  const existingItemIndex = currentState.items.findIndex((item) => item.dish.id === dish.id);

  let newItems: IBasketItem[];

  if (existingItemIndex !== -1) {
    newItems = currentState.items.map((item, index) =>
      index === existingItemIndex ? { ...item, count: item.count + 1 } : item
    );
  } else {
    newItems = [...currentState.items, { dish, count: 1 }];
  }

  const totalCount = newItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = newItems.reduce((sum, item) => sum + item.dish.price * item.count, 0);

  return { items: newItems, totalCount, totalPrice };
};

export const calculateTotalCount = (basket: IBasketState): number => {
  return basket.items.reduce((sum, item) => sum + item.count, 0);
};

export const calculateTotalPrice = (basket: IBasketState): number => {
  return basket.items.reduce((sum, item) => sum + item.dish.price * item.count, 0);
};

export const clearBasket = (): IBasketState => {
  return { items: [], totalCount: 0, totalPrice: 0 };
};

export const checkBasket = (basket: IBasketState): boolean => {
  return basket.items.length > 0;
};

export const syncBasketWithDishes = (currentState: IBasketState, dishes: IDish[]): IBasketState => {
  const validItems = currentState.items.filter(item =>
    dishes.some(dish => dish.id === item.dish.id)
  );

  const updatedItems = validItems.map(item => {
    const updatedDish = dishes.find(dish => dish.id === item.dish.id);
    if (!updatedDish) return item;
    return { ...item, dish: updatedDish };
  });

  const totalCount = updatedItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = updatedItems.reduce((sum, item) => sum + item.dish.price * item.count, 0);

  return { items: updatedItems, totalCount, totalPrice };
};

