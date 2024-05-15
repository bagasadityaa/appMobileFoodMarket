const initHome = {
  categories: [],
  food: [],
  operasional: [],
  jam: [],
  // ayam: [],
  // bebek: [],
  // ikan: [],
  // kuah: [],
  // tambahan: [],
  // tambahanSambel: [],
  // minuman: [],
  // paketnasibox: [],
};

export const homeReducer = (state = initHome, action) => {
  if (action.type === 'SET_OPERASIONAL') {
    return {
      ...state,
      operasional: action.value,
    };
  }
  if (action.type === 'SET_JAM') {
    return {
      ...state,
      jam: action.value,
    };
  }
  if (action.type === 'SET_CATEGORIES') {
    return {
      ...state,
      categories: action.value,
    };
  }
  if (action.type === 'SET_FOOD') {
    return {
      ...state,
      food: action.value,
    };
  }
  // if (action.type === 'SET_AYAM') {
  //   return {
  //     ...state,
  //     ayam: action.value,
  //   };
  // }
  // if (action.type === 'SET_BEBEK') {
  //   return {
  //     ...state,
  //     bebek: action.value,
  //   };
  // }
  // if (action.type === 'SET_IKAN') {
  //   return {
  //     ...state,
  //     ikan: action.value,
  //   };
  // }
  // if (action.type === 'SET_KUAH') {
  //   return {
  //     ...state,
  //     kuah: action.value,
  //   };
  // }
  // if (action.type === 'SET_TAMBAHAN') {
  //   return {
  //     ...state,
  //     tambahan: action.value,
  //   };
  // }
  // if (action.type === 'SET_TAMBAHANSAMBEL') {
  //   return {
  //     ...state,
  //     tambahanSambel: action.value,
  //   };
  // }
  // if (action.type === 'SET_MINUMAN') {
  //   return {
  //     ...state,
  //     minuman: action.value,
  //   };
  // }
  // if (action.type === 'SET_PAKETNASIBOX') {
  //   return {
  //     ...state,
  //     paketnasibox: action.value,
  //   };
  // }

  return state;
};
