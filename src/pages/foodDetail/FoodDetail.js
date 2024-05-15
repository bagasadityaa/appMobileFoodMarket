import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Counter, Number, Rating} from '../../components/Components';
import {getData} from '../../utils/utils';

const FoodDetail = ({navigation, route}) => {
  const {id, name, picturePath, rate, ingredients, description, price, status} =
    route.params;
  const [totalItem, setTotalItem] = useState(1);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);
  const onCounterChange = value => {
    setTotalItem(value);
  };

  const onOrder = () => {
    const totalPrice = totalItem * price;
    const driver = 50000;
    const tax = (10 / 100) * totalPrice;
    const total = totalPrice + driver + tax;
    const data = {
      item: {
        id,
        name,
        price,
        picturePath,
      },
      transaction: {
        totalItem,
        totalPrice,
        driver,
        tax,
        total,
      },
      userProfile,
    };
    // console.log('data for checkout: ', data);
    navigation.navigate('OrderSummary', data);
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.page}>
        <ImageBackground
          // source={{uri: picturePath}}
          style={styles.cover}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../image/backWhite.png')}
              style={styles.back}
            />
          </TouchableOpacity>
          <Image source={require('../image/ayambakar.jpg')} />
        </ImageBackground>
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.productContainer}>
              <View>
                <Text style={styles.title}>{name}</Text>
                {/* <Rating number={rate} /> */}
              </View>
              <Counter onValueChange={onCounterChange} />
            </View>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.labelTotal}>Total Price</Text>
              <Number number={totalItem * price} style={styles.priceTotal} />
            </View>
            <View style={styles.button}>
              <Button text="Check Out" onPress={onOrder} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  cover: {
    height: 330,
    paddingTop: 26,
    paddingLeft: 22,
  },
  back: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 26,
    paddingHorizontal: 16,
    flex: 1,
    height: 528,
  },
  page: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },

  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 16,
  },
  mainContent: {
    flex: 1,
  },
  footer: {flexDirection: 'row', paddingVertical: 16, alignItems: 'center'},
  priceContainer: {
    flex: 1,
  },
  labelTotal: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  priceTotal: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  button: {
    width: 190,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 4,
  },
});
