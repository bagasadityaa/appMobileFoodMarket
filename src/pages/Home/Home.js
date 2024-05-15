import Axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
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
import {ItemListHome} from '../../components/Components';
import {API_HOST} from '../../config/config';
import {getCart} from '../../redux/action/cart';
import {categoryfood, getFoodData, getStatus} from '../../redux/action/home';
import {getData, showMessage} from '../../utils/utils';
import {setLoading} from '../../redux/action/global';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {cartes, totalQuantity} = useSelector(state => state.cartReducer);
  const [showCounterr, setShowCounterr] = useState(false);
  const {food, categories, operasional, jam} = useSelector(
    state => state.homeReducer,
  );

  useEffect(() => {
    getData('token')
      .then(resToken => {
        Axios.get(`${API_HOST.url}cart`, {
          headers: {
            Authorization: resToken.value,
          },
        })
          .then(res => {
            // dispatch({type: 'SET_CART', value: res.data});
            dispatch({
              type: 'SET_TOTAL_QUANTITY',
              value: res.data.reduce((acc, item) => acc + item.quantity, 0),
            });
          })
          .catch(err => {
            showMessage(
              `${err?.response?.data?.message} on Transaction API` ||
                'Terjadi Kesalahan di API Transaction',
              'danger',
            );
          });
      })
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on Authentication API` ||
            'Terjadi Kesalahan di API Authentication',
          'danger',
        );
      });
  }, [dispatch]);

  const buttonPesan = useCallback(
    (valueName, valuePrice, id) => {
      getData('token').then(resToken => {
        Axios.post(
          `${API_HOST.url}cart/create`,
          {
            food_id: id,
            quantity: 1,
            nama_food: valueName,
            harga_food: valuePrice,
          },
          {
            headers: {
              Authorization: resToken.value,
            },
          },
        )
          .then(res => {
            onRefresh();
            setShowCounterr(!showCounterr, res);
            showMessage('Berhasil ditambahkan ke keranjang', 'success');
          })
          .catch(err => {
            // console.log('Cart Failed ', err);
            showMessage('Cart Failed ditambahkan ke keranjang', 'danger');
          });
      });
    },
    [showCounterr],
  );
  useEffect(() => {
    dispatch(categoryfood());
    dispatch(getFoodData());
  }, [dispatch]);
  // console.log('data food', food);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(categoryfood());
    dispatch(getFoodData());
    dispatch(getStatus());
    dispatch(getCart());
    setRefreshing(false);
  }, [dispatch]);

  const [totalItem, setTotalItem] = useState(1);

  const onCounterChange = value => {
    setTotalItem(value);
  };

  useEffect(() => {
    dispatch(getStatus());
  }, [dispatch]);

  // console.log('food', food.nama_food);
  return (
    <View style={styles.page}>
      <View style={styles.tabContainer}>
        {operasional.status === 'tutup' ? (
          <View style={styles.container}>
            <View style={styles.containerTextTutup}>
              <Text style={styles.textTutup}>Maaf Resto Sedang Tutup</Text>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View>
                {categories.map(category => (
                  <View key={category.id}>
                    <View style={styles.containerCategory}>
                      <Text style={styles.category}>
                        {category.nama_kategori}
                      </Text>
                    </View>
                    {category.foods.map(item => {
                      const isItemInCart = cartes.some(
                        cartItem => cartItem.food_id === item.id,
                      );

                      return (
                        <ItemListHome
                          key={item.id}
                          type="tutup"
                          operasional={operasional.status}
                          name={item.nama_food}
                          price={item.harga_food}
                          description={item.deskripsi_food}
                          style={styles.item}
                          isItemInCart={isItemInCart}
                          onCounterChange={buttonPesan}
                          status={item.status_food}
                          image={{
                            uri:
                              'https://foodmarket.cloud/storage/' +
                              item.gambar_food,
                          }}
                          onPress={() =>
                            navigation.navigate('FoodDetail', item)
                          }
                          onPressTambah={() =>
                            buttonPesan(
                              item.nama_food,
                              item.harga_food,
                              item.id,
                            )
                          }
                          valueName={item.nama_food}
                          valuePrice={item.harga_food}
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {categories.length < 1 ? (
                <View style={styles.containerWait}>
                  <Image
                    source={require('../image/food.png')}
                    style={styles.imageWait}
                  />
                  <Text style={styles.textWait}>Mohon Ditunggu Sebentar</Text>
                </View>
              ) : (
                <View>
                  {categories.map(category => (
                    <View key={category.id}>
                      <View style={styles.containerCategory}>
                        <Text style={styles.category}>
                          {category.nama_kategori}
                        </Text>
                      </View>
                      {category.foods.map(item => {
                        const isItemInCart = cartes.some(
                          cartItem => cartItem.food_id === item.id,
                        );

                        return (
                          <ItemListHome
                            key={item.id}
                            type="card"
                            name={item.nama_food}
                            price={item.harga_food}
                            description={item.deskripsi_food}
                            style={styles.item}
                            isItemInCart={isItemInCart}
                            onCounterChange={buttonPesan}
                            status={item.status_food}
                            image={{
                              uri:
                                'https://foodmarket.cloud/storage/' +
                                item.gambar_food,
                            }}
                            onPress={() =>
                              navigation.navigate('FoodDetail', item)
                            }
                            onPressTambah={() =>
                              buttonPesan(
                                item.nama_food,
                                item.harga_food,
                                item.id,
                              )
                            }
                            valueName={item.nama_food}
                            valuePrice={item.harga_food}
                          />
                        );
                      })}
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </View>
      {operasional.status === 'tutup' ? (
        <View></View>
      ) : (
        <View style={styles.containerButtonBottom}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Cart', cartes)}>
            <Text style={styles.cart}>Keranjang ({totalQuantity})</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerTextTutup: {
    textAlign: 'center',
    backgroundColor: 'red',
    padding: 15,
  },
  textTutup: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
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
  containerButtonBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerMenu: {
    justifyContent: 'flex-start',
  },
  containerCart: {
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: '#7A4141',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cart: {
    backgroundColor: '#7A4141',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    width: 65,
    height: 28,
    right: 110,
    top: 26,
    backgroundColor: '#7A4141',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },

  containerImage: {
    top: 10,
    left: 5,
  },
  image: {
    width: 102,
    height: 68,
    left: 11,
    borderRadius: 10,
  },
  containerTitle: {
    top: 5,
    left: 25,
  },
  title: {
    fontWeight: '400',
    fontSize: 16,
    left: 11,
    color: 'black',
  },
  containerDescription: {
    top: 27,
    width: 177,
    height: 32,
    right: 48,
  },
  description: {
    fontWeight: '400',
    fontSize: 13,
  },
  containerPrice: {
    width: 48,
    height: 18,
    right: 225,
    top: 55,
  },
  price: {
    fontWeight: '400',
    fontSize: 15,
  },
  containerCard: {
    width: 428,
    height: 90,
    top: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  containerCategory: {
    left: 17,
    alignItems: 'flex-start',
    width: 100,
    top: 10,
  },
  category: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 18,
    fontStyle: 'normal',
    textAlign: 'center',
    color: 'black',
  },
  container: {
    flex: 1,
  },
  page: {flex: 1, backgroundColor: 'white'},
  foodCardContainer: {flexDirection: 'row', marginVertical: 24},
  tabContainer: {flex: 1},
  buttonPopUp: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonModalPopUp: {
    backgroundColor: 'yellow',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  containerButtonClosePopUp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 30,
  },
  containerButtonOpenPopUp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 30,
    position: 'relative',
  },
  modalContainerPopUp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    bottom: 73,
  },
  containerPopUp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  modalContentPopUp: {
    backgroundColor: '#7A4141',
    borderRadius: 5,
    bottom: 35,
  },

  containerCardPopUp: {
    height: 480,
    backgroundColor: 'white',
  },
  cardContainerPopUp: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    bottom: 68,
  },
  imageCard: {
    width: 380,
    height: 233,
    borderRadius: 10,
    top: 22,
  },
  cardImagePopUp: {
    alignSelf: 'center',
    flexDirection: 'column',
  },
  containerCardTitle: {
    top: 38,
  },
  cardTitle: {
    fontWeight: '400',
    fontSize: 15,
    color: 'black',
  },
  containerCardDeskripsi: {
    top: 44,
  },
  cardDeskripsi: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  containerCardPrice: {
    top: 125,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  containerCardButton: {
    top: 140,
  },
  cardButtonAdd: {
    backgroundColor: '#7A4141',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  tambahPesanan: {
    color: 'white',
  },
  closeButtonCard: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    bottom: 68,
  },
});
