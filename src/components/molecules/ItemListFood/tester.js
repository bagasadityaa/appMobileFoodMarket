import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header, ItemListHome, Number} from '../../components/Components';
import {API_HOST} from '../../config/config';
import {getCart} from '../../redux/action/cart';
import {setLoading} from '../../redux/action/global';
import {getData, showMessage} from '../../utils/utils';

const Cart = ({navigation, onValueChange}) => {
  const dispatch = useDispatch();
  const [totalHarga, setTotalHarga] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getCart());
    setRefreshing(false);
  };
  const onLoading = () => {
    setLoading(true);
    dispatch(getCart());
  };
  const [totalItem, setTotalItem] = useState(1);
  const onCounterChange = value => {
    setTotalItem(value);
  };
  const hitungTotalHarga = () => {
    let hargaTotal = 0;
    cartes.forEach(cart => {
      hargaTotal += cart.price * totalItem;
    });
    setTotalHarga(hargaTotal);
  };

  useEffect(() => {
    hitungTotalHarga();
  }, [hitungTotalHarga]);

  const buttonCheckOut = (id, totalItem, totalHarga, userProfile) => {
    getData('token').then(resToken => {
      const data = {
        food_id: '1',
        user_id: '1',
        total: '900000',
        quantity: '10',
        status: 'Menunggu_Konfirmasi',
      };
      Axios.post(`${API_HOST.url}checkout`, data, {
        headers: {
          Authorization: resToken.value,
        },
      })
        .then(res => {
          showMessage('Berhasil checkout', 'success');
          // console.log('Success CheckOut: ', res);
        })
        .catch(err => {
          // console.log('Behasil menggunakan metode COD', err);
          showMessage(
            // `${err?.response?.data?.message} on Food API` ||
            'Terjadi Kesalahan di API Food',
            'success',
          );
        });
    });
  };
  const {cartes} = useSelector(state => state.cartReducer);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const [userProfile, setUserProfile] = useState({});
  // useEffect(() => {
  //   getData('userProfile').then(res => {
  //     setUserProfile(res);
  //     console.log('Profile: ', res);
  //   });
  // }, []);
  // console.log('Cart : ', cartes);
  const buttonDelete = id => {
    getData('token').then(resToken => {
      Axios.delete(`${API_HOST.url}cart/${id}`, {
        headers: {
          Authorization: resToken.value,
        },
      })
        .then(res => {
          onRefresh(true);
          // console.log('Success delete: ', res);
          showMessage('Cart berhasil dihapus', 'success');
        })
        .catch(err => {
          showMessage(
            // `${err?.response?.data?.message} on Food API` ||
            //   'Terjadi Kesalahan di API Food',
            'Mohon ditunggu sebentar',
          );
        });
    });
  };

  return (
    <View style={styles.container}>
      <Header
        onBack={() => navigation.goBack()}
        title="Cart"
        subTitle="Yuk Checkout"
      />
      {cartes.length < 1 ? (
        <View style={styles.containerWait}>
          <Image
            source={require('../image/emptyCart.png')}
            style={styles.imageWait}
          />
          <Text style={styles.textWait}>Belum ada item</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
            <Text style={styles.textPesan}>Pesan dulu yuk</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.containerBody}>
            {cartes.map((item, index) => {
              return (
                <ItemListHome
                  key={index.toString()}
                  type="Keranjang"
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onPress={() => buttonDelete(item.id)}
                  onCounterChange={onCounterChange}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
      {cartes.length < 1 ? (
        <View></View>
      ) : (
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text>Total Harga</Text>
            <Number number={totalHarga} style={styles.priceTotal} />
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              onPress={() => buttonCheckOut()}
              activeOpacity={0.5}
              style={styles.button}>
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  textPesan: {
    padding: 10,
    backgroundColor: '#7A4141',
    color: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
  containerWait: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWait: {
    width: 150,
    height: 150,
  },
  textWait: {
    fontSize: 15,
  },
  container: {
    flex: 1,
  },
  containerBody: {
    backgroundColor: 'white',
    paddingBottom: 33,
    marginTop: 23,
  },

  footer: {
    marginTop: 23,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  priceContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  priceTotal: {
    color: 'black',
    fontWeight: 'bold',
  },
  containerButton: {
    flex: 1,
    marginRight: 20,
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#7A4141',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {fontWeight: '500', color: 'white'},
});
