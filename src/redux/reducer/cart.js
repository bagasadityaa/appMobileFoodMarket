const initCart = {
  cartes: [],
  totalQuantity: 0,
};

export const cartReducer = (state = initCart, action) => {
  if (action.type === 'SET_CART') {
    return {
      ...state,
      cartes: action.value,
    };
  }
  if (action.type === 'SET_TOTAL_QUANTITY') {
    return {
      ...state,
      totalQuantity: action.value,
    };
  }

  return state;
};
