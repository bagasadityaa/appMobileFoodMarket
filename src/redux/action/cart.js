import Axios from 'axios';
import {getData} from '../../utils/utils';
import {API_HOST} from '../../config/config';

export const getCart = () => dispatch => {
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}cart`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        dispatch({type: 'SET_CART', value: res.data});
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on Transaction API` ||
            'Terjadi Kesalahan di API Transaction',
        );
      });
  });
};
export const getCartTotalQuantity = () => {
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}cart`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        const cart = res.data;
        const totalQuantity = cart.reduce(
          (acc, item) => acc + item.quantity,
          0,
        );
        // setCartt(res);

        dispatch({type: 'SET_CART', value: cart});
        dispatch({type: 'SET_TOTAL_QUANTITY', value: totalQuantity});
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on Transaction API` ||
            'Terjadi Kesalahan di API Transaction',
        );
      });
  });
};
