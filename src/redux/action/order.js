import Axios from 'axios';
import {API_HOST} from '../../config/config';
import {getData, showMessage} from '../../utils/utils';

export const getOrders = () => dispatch => {
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}order`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        dispatch({type: 'SET_ORDER', value: res.data.data.data});
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on Order API` ||
            'Terjadi Kesalahan di API Order',
        );
      });
  });
};
export const getOrdersAllOne = orderId => dispatch => {
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}orderAllOne/${orderId}`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        dispatch({type: 'SET_ORDER_ALLONE', value: res.data.data.order_item});
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on Order API` ||
            'Terjadi Kesalahan di API Order',
        );
        // console.log('error orderDetail orderAllIne', err);
      });
  });
};
export const getOrdersAllOneUser = orderId => dispatch => {
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}orderAllOne/${orderId}`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        console.log('user', res);
        dispatch({type: 'SET_ORDER_ALLONEUSER', value: res.data.data});
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on Order API` ||
            'Terjadi Kesalahan di API Order',
        );
        // console.log('error orderDetail orderAllIne', err);
      });
  });
};
export const getOrdersAllOneOrder = orderId => dispatch => {
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}orderAllOne/${orderId}`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        dispatch({
          type: 'SET_ORDER_ALLONEUSER_ORDER',
          value: res.data.data,
        });
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on Order API` ||
            'Terjadi Kesalahan di API Order',
        );
        // console.log('error orderDetail orderAllIne', err);
      });
  });
};

// 16258054093

// 70012
// 397518022369

export const getInProgress = () => dispatch => {
  getData('token').then(resToken => {
    Axios.all([
      Axios.get(
        `${API_HOST.url}order?status_pesanan=menunggu_konfirmasi&sort=updated_at,desc`,
        {
          headers: {
            Authorization: resToken.value,
          },
        },
      ),
      Axios.get(
        `${API_HOST.url}order?status_pesanan=sedang_diproses&sort=updated_at,desc`,
        {
          headers: {
            Authorization: resToken.value,
          },
        },
      ),
      Axios.get(
        `${API_HOST.url}order?status_pesanan=sedang_dikirim&sort=updated_at,desc`,
        {
          headers: {
            Authorization: resToken.value,
          },
        },
      ),
    ])
      .then(
        Axios.spread((res1, res2, res3) => {
          const menungguKonfirmasi = res1.data.data.data;
          const sedangDiproses = res2.data.data.data;
          const sedangDikirim = res3.data.data.data;
          const sortedData = [
            ...menungguKonfirmasi,
            ...sedangDiproses,
            ...sedangDikirim,
          ].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
          dispatch({
            type: 'SET_IN_PROGRESS',
            value: sortedData,
          });
        }),
      )
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on In Progress API` ||
            'Terjadi Kesalahan di In Progress API',
        );
      });
  });
};

export const getPastOrders = () => dispatch => {
  getData('token').then(resToken => {
    Axios.all([
      Axios.get(`${API_HOST.url}order?status_pesanan=batal`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}order?status_pesanan=selesai`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
    ])
      .then(
        Axios.spread((res1, res2) => {
          const batal = res1.data.data.data;
          const selesai = res2.data.data.data;
          const sortedData = [...selesai, ...batal].sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
          );
          dispatch({
            type: 'SET_PAST_ORDERS',
            value: sortedData,
          });
        }),
      )
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on Past Order API` ||
            'Terjadi Kesalahan di API Past Order',
        );
      });
  });
};
