const initOrder = {
  orders: [],
  ordersAllOne: [],
  ordersAllOneUser: [],
  ordersAllOneUserOrder: [],
  carts: [],
  inProgress: [],
  pastOrders: [],
};

export const orderReducer = (state = initOrder, action) => {
  if (action.type === 'SET_ORDER') {
    return {
      ...state,
      orders: action.value,
    };
  }
  if (action.type === 'SET_ORDER_ALLONE') {
    return {
      ...state,
      ordersAllOne: action.value,
    };
  }
  if (action.type === 'SET_ORDER_ALLONEUSER') {
    return {
      ...state,
      ordersAllOneUser: action.value,
    };
  }
  if (action.type === 'SET_ORDER_ALLONEUSER_ORDER') {
    return {
      ...state,
      ordersAllOneUserOrder: action.value,
    };
  }
  if (action.type === 'SET_CART') {
    return {
      ...state,
      carts: action.value,
    };
  }
  if (action.type === 'SET_IN_PROGRESS') {
    return {
      ...state,
      inProgress: action.value,
    };
  }
  if (action.type === 'SET_PAST_ORDERS') {
    return {
      ...state,
      pastOrders: action.value,
    };
  }
  return state;
};
