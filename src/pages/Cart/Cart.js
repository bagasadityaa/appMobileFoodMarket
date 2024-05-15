import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Header,
  ItemListFood,
  ItemValue,
} from '../../components/Components';
import {API_HOST} from '../../config/config';
import {getCart} from '../../redux/action/cart';
import {getData, showMessage, useForm} from '../../utils/utils';
const Cart = ({navigation, route}) => {
  const {item, transaction} = route.params;
  const dispatch = useDispatch();
  const [apiData, setApiData] = useState(null);

  // const onNavChange = state => {
  // console.log('nav: ', state);
  //   const urlSuccess = 'http';
  //   const titleWeb = 'Laravel';
  //   if (state.title === titleWeb) {
  //     navigation.reset({index: 0, routes: [{name: 'SuccessOrder'}]});
  //   }
  // };
  // if (isPaymentOpen) {
  //   return (
  //     <>
  //       <Header
  //         title="Payment"
  //         subTitle="You deserve better meal"
  //         onBack={() => setIsPaymentOpen(false)}
  //       />
  //       <WebView
  //         source={{uri: paymentURL}}
  //         startInLoadingState={true}
  //         renderLoading={() => <Loading />}
  //         onNavigationStateChange={onNavChange}
  //       />
  //     </>
  //   );
  // }
  const [refreshing, setRefreshing] = useState(false);

  // const onCounterChange = value => {
  //   setTotalItem(value);
  // };
  // const [totalItem, setTotalItem] = useState(1);
  // const hitungTotalHarga = () => {
  //   let hargaTotal = 0;
  //   cartes.forEach(cart => {
  //     hargaTotal += cart.harga_food * totalItem;
  //   });
  //   setTotalHarga(hargaTotal);
  // };
  // useEffect(() => {
  //   hitungTotalHarga();
  // }, [totalItem, cartes]);
  const {cartes} = useSelector(state => state.cartReducer);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getCart());
    setRefreshing(false);
  };
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
          // navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        })
        .catch(err => {
          onRefresh();
          showMessage(
            `${err?.response?.data?.message} on Food API` ||
              'Terjadi Kesalahan di API Food',
            'Mohon ditunggu sebentar',
          );
        });
    });
  };

  const [form, setForm] = useForm({
    alamat: '',
  });

  const onCheckout = async () => {
    if (cartes.length > 0) {
      try {
        const resToken = await getData('token');
        const authToken = resToken.value;

        const orderData = {
          user_id: userProfile.id,
          name: userProfile.name,
          nomor_hp: userProfile.nomor_hp,
          alamat: form.alamat !== '' ? form.alamat : userProfile.alamat,
          status_pesanan: 'menunggu_konfirmasi',
          total_harga: totalHargaItem,
          metode_pembayaran: 'COD',
        };

        const orderResponse = await Axios.post(
          `${API_HOST.url}createOrder`,
          orderData,
          {
            headers: {
              Authorization: authToken,
            },
          },
        );

        // console.log('orderData', orderData);
        const orderId = orderResponse.data.data.id;

        const itemPromises = cartes.map(cart => {
          const quantity = itemQuantities[cart.id] || cart.quantity;
          const orderItemData = {
            food_id: cart.food_id,
            order_id: orderId,
            nama_food: cart.nama_food,
            quantity: quantity,
            harga_food: cart.harga_food,
          };
          console.log('orderDataItem', orderItemData);

          return Axios.post(`${API_HOST.url}createOrderItem`, orderItemData, {
            headers: {
              Authorization: authToken,
            },
          });
        });

        const itemResponses = await Promise.all(itemPromises);
        // console.log('Item Responses: ', itemResponses);
        showMessage(
          'Checkout Berhasil menggunakan metode pembayaran COD',
          'success',
        );
        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        onRefresh();
      } catch (error) {
        console.error('Gagal melakukan checkout', error);
        showMessage('Checkout gagal', 'error');
      }
    } else {
      showMessage(
        'Keranjang kosong, tidak dapat melakukan checkout',
        'warning',
      );
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);

  const [itemQuantities, setItemQuantities] = useState({});
  const onCounterChange = (value, itemId) => {
    setItemQuantities({...itemQuantities, [itemId]: value});
  };

  const [totalHarga, setTotalHarga] = useState(0);

  // const calculateItemTotal = item => {
  //   const quantity = itemQuantities[item.id] || item.quantity;
  //   return item.harga_food * quantity;
  // };

  // // Fungsi untuk menghitung total harga keseluruhan
  // const calculateTotalPrice = () => {
  //   let totalPrice = 0;
  //   cartes.forEach(item => {
  //     totalPrice += calculateItemTotal(item);
  //   });
  //   setTotalHarga(totalPrice);
  // };

  // const hitungTotalHarga = () => {
  //   let hargaTotal = 0;
  //   cartes.forEach(cart => {
  //     const quantity = itemQuantities[cart.id] || cart.quantity; // Gunakan jumlah item yang diperbarui jika ada
  //     hargaTotal += cart.harga_food * quantity;
  //   });
  //   setTotalHarga(hargaTotal);
  // };
  // let totalHargaItem = 0;

  const totalHargaItem = cartes.reduce((total, item) => {
    const quantity = itemQuantities[item.id] || item.quantity;
    const hargaItem = item.harga_food * quantity;
    // console.log('quantity item', quantity);
    return total + hargaItem;
  }, 0);

  // console.log('userProfile', userProfile);
  // return <WebView source={{uri: 'https://google.com'}} />;
  return (
    <ScrollView>
      <View>
        {cartes.length < 1 ? (
          <Header
            title="Keranjang"
            subTitle="Tambah item keranjang"
            onBack={() => navigation.goBack()}
          />
        ) : (
          <Header
            title="Checkout"
            subTitle="Yuk! Checkout"
            onBack={() => navigation.goBack()}
          />
        )}
        <View style={styles.container}>
          {cartes.length < 1 ? (
            <View style={styles.content}>
              <View style={styles.containerWait}>
                <View style={styles.containerImageWait}>
                  <Image
                    source={require('../image/emptyCart.png')}
                    style={styles.imageWait}
                  />
                </View>
                <Text style={styles.textWait}>Belum ada item</Text>
                <TouchableOpacity
                  style={styles.containerButton}
                  onPress={() => navigation.navigate('MainApp')}>
                  <Text style={styles.textPesan}>Pesan dulu yuk</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.content}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <View>
                  <View style={styles.containerDetailTransaction}>
                    <Text style={styles.label}>Item Order</Text>
                    {/* <View style={styles.totalHarga}> */}
                    {/* <Text>Total Harga</Text> */}

                    {/* </View> */}
                    {cartes.map((item, index) => {
                      // const clonedItem = {...item};

                      // const hargaItem =
                      //   clonedItem.harga_food *
                      //   (itemQuantities[clonedItem.id] || clonedItem.quantity);
                      // totalHargaItem += hargaItem;

                      return (
                        <ItemListFood
                          key={index.toString()}
                          type="cart"
                          name={item.nama_food}
                          CardpriceCard={item.harga_food}
                          // totalHargaItem={totalHargaItem}
                          onPressButtonDelete={() => buttonDelete(item.id)}
                          onCounterChange={value =>
                            onCounterChange(value, item.id)
                          }
                        />
                      );
                    })}

                    <Text style={styles.details}>Detail Transaksi</Text>
                    {/* <ItemValue label="Driver" value="50000" type="currency" /> */}
                    {/* <ItemValue label="Tax 10% " value="0" type="currency" /> */}
                    <ItemValue
                      label="Total Harga"
                      value={totalHargaItem}
                      valueColor="#1ABC9C"
                      type="currency"
                    />
                    <ItemValue
                      label="Metode Pembayaran"
                      value="COD/Bayar Ditempat"
                    />
                  </View>
                </View>
                <View style={styles.contentDeliver}>
                  <Text style={styles.label}>Kirim ke:</Text>
                  <ItemValue label="Nama" value={userProfile.name} />
                  <ItemValue label="Nomor Hp" value={userProfile.nomor_hp} />
                  {/* <ItemValue label="Alamat" value={userProfile.alamat} /> */}
                  <View style={styles.containerAlamat}>
                    <Text style={styles.labelAlamat}>Alamat</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={
                        form.alamat !== '' ? form.alamat : userProfile.alamat
                      }
                      placeholderTextColor="#000000"
                      value={form.alamat}
                      onChangeText={value => setForm('alamat', value)}
                      multiline={true}
                      textAlignVertical="top"
                    />
                  </View>
                  {/* <T? */}
                  {/* <TextInput */}
                </View>
                <View style={styles.button}>
                  <Button text="Pesan Sekarang" onPress={onCheckout} />
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  containerAlamat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    padding: 10,
    color: '#020202',
    width: 150,
  },
  textPesan: {
    backgroundColor: '#7A4141',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1},
  containerWait: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 220,
    // backgroundColor: 'black',
    flex: 1,
  },
  containerImageWait: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'black',
    flex: 1,
  },
  imageWait: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  contentDeliver: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 15,
  },
  containerDetailTransaction: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 15,
  },
  content: {
    paddingHorizontal: 13,
    marginTop: 24,
  },
  details: {
    color: '#000000',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  labelAlamat: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  button: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
