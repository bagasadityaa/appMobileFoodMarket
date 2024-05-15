import Axios from 'axios';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Header,
  ItemListFood,
  ItemValue,
} from '../../components/Components';
import {API_HOST} from '../../config/config';
import {getData, showMessage} from '../../utils/utils';

const OrderSummary = ({navigation, route}) => {
  const {item, transaction, userProfile} = route.params;

  const onCheckout = () => {
    const data = {
      food_id: item.id,
      user_id: userProfile.id,
      quantity: transaction.totalItem,
      total: transaction.total,
      status: 'Menunggu_Konfirmasi',
    };
    getData('token').then(resToken => {
      Axios.post(`${API_HOST.url}checkout`, data, {
        headers: {
          Authorization: resToken.value,
        },
      })
        .then(res => {
          // console.log('Success CheckOut : ', res);
          showMessage('Checkou berhasil menggunakan metode COD', 'success');
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        })
        .catch(err => {
          // console.log('Berhasil menggunakan metode COD', err);
          showMessage('Checkout berhasil menggunakan metode COD', 'success');
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        });
    });
  };

  // const onNavChange = state => {
  //   console.log('nav: ', state);
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
  return (
    <ScrollView>
      <View>
        <Header
          title="Order Summary"
          subTitle="You Deserve better meal"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <Text style={styles.label}>Item Ordered</Text>
          <ItemListFood
            type="order-summary"
            name={item.name}
            price={item.price}
            items={transaction.totalItem}
            image={{uri: item.picturePath}}
          />
          <Text style={styles.details}>Details Transaction</Text>
          <ItemValue
            label={item.name}
            value={transaction.totalPrice}
            type="currency"
          />
          <ItemValue
            label="Driver"
            value={transaction.driver}
            type="currency"
          />
          <ItemValue label="Tax 10% " value={transaction.tax} type="currency" />
          <ItemValue
            label="Total Price"
            value={transaction.total}
            valueColor="#1ABC9C"
            type="currency"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Deliver to:</Text>
          <ItemValue label="Name" value={userProfile.name} />
          <ItemValue label="Phone No." value={userProfile.phonenumber} />
          <ItemValue label="Address" value={userProfile.address} />
          <ItemValue label="House No." value={userProfile.housenumber} />
          <ItemValue label="City" value={userProfile.city} />
        </View>
        <View style={styles.button}>
          <Button text="Checkout Now" onPress={onCheckout} />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  button: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
