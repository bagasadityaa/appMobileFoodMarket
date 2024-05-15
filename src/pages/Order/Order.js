import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderEmpty from '../../components/molecules/OrderEmpty/OrderEmpty';
import {Header, OrderTabSection} from '../../components/Components';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from '../../redux/action/order';

const Order = ({navigation}) => {
  const [isEmpty] = useState(false);
  const dispatch = useDispatch();
  const {orders} = useSelector(state => state.orderReducer);
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <View style={styles.page}>
      {orders.length < 1 ? (
        <OrderEmpty />
      ) : (
        <View style={styles.content}>
          <Header title="Pesanan" subTitle="Riwayat Pesanan" />
          <View style={styles.tabContainer}>
            <OrderTabSection />
          </View>
        </View>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  page: {flex: 1},
  content: {flex: 1},
  tabContainer: {flex: 1, marginTop: 24},
});
