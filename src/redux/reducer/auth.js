const initStateRegister = {
  name: '',
  email: '',
  password: '',
  alamat: '',
  nomor_hp: '',
};

export const registerReducer = (state = initStateRegister, action) => {
  if (action.type === 'SET_REGISTER') {
    return {
      ...state,
      name: action.value.name,
      email: action.value.email,
      password: action.value.password,
      nomor_hp: action.value.nomor_hp,
      alamat: action.value.alamat,
    };
  }
  return state;
};

const initPhoto = {
  uri: '',
  type: '',
  name: '',
  isUploadPhoto: false,
};

export const photoReducer = (state = initPhoto, action) => {
  if (action.type === 'SET_PHOTO') {
    return {
      ...state,
      uri: action.value.uri,
      type: action.value.type,
      name: action.value.name,
    };
  }
  if (action.type === 'SET_UPLOAD_PHOTO') {
    return {
      ...state,
      isUploadPhoto: action.value,
    };
  }
  return state;
};
