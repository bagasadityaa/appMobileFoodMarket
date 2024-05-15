const {default: Axios} = require('axios');
const {API_HOST} = require('../../config/config');
import {getData, showMessage} from '../../utils/utils';
import {setLoading} from './global';

export const getFoodData = () => dispatch => {
  Axios.get(`${API_HOST.url}food`)
    .then(res => {
      // console.log('res food: ', res);
      dispatch({type: 'SET_FOOD', value: res.data.data.data});
    })
    .catch(err => {
      // console.log('err:', err);
    });
};
export const getJam = () => dispatch => {
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}dashboard/statusResto/jamOperasional`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        dispatch({
          type: 'SET_JAM',
          value: res.data,
        });
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on status API` ||
            'Terjadi Kesalahan di API Order',
        );
        console.log('error status', err);
      });
  });
};

export const getStatus = () => dispatch => {
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}dashboard/statusResto`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        const status = res.data.meta.message;
        dispatch({
          type: 'SET_OPERASIONAL',
          value: status,
        });
        // console.log('operasionl', res);
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on status API` ||
            'Terjadi Kesalahan di API Order',
        );
        // console.log('error status', err);
      });
  });
};

// Redux action creator
export const categoryfood = () => dispatch => {
  Axios.get(`${API_HOST.url}categoryfood`)
    .then(res => {
      dispatch({type: 'SET_CATEGORIES', value: res.data.meta.message});
    })
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on Food API` ||
          'Terjadi Kesalahan di API Food',
        'danger',
      );
    });
};

export const getFoodDatabyTypes = types => dispatch => {
  Axios.get(`${API_HOST.url}food?types=${types}`)
    .then(res => {
      // console.log('res food: ', res.data.data.data);
      if (types === 'ayam') {
        dispatch({type: 'SET_AYAM', value: res.data.data.data});
      }
      if (types === 'bebek') {
        dispatch({type: 'SET_BEBEK', value: res.data.data.data});
      }
      if (types === 'ikan') {
        dispatch({type: 'SET_IKAN', value: res.data.data.data});
      }
      if (types === 'kuah') {
        dispatch({type: 'SET_KUAH', value: res.data.data.data});
      }
      if (types === 'tambahan') {
        dispatch({type: 'SET_TAMBAHAN', value: res.data.data.data});
      }
      if (types === 'tambahanSambel') {
        dispatch({type: 'SET_TAMBAHANSAMBEL', value: res.data.data.data});
      }
      if (types === 'minuman') {
        dispatch({type: 'SET_MINUMAN', value: res.data.data.data});
      }
      if (types === 'paketNasiBox') {
        dispatch({type: 'SET_PAKETNASIBOX', value: res.data.data.data});
      }
    })
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on Food By Type API` ||
          'Terjadi kesalahan di API Food By Type',
      );
    });
};
