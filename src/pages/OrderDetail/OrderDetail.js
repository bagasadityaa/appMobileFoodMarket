import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Header,
  ItemListFood,
  ItemValue,
} from '../../components/Components';
import Axios from 'axios';
import {API_HOST} from '../../config/config';
import {getData, showMessage} from '../../utils/utils';
import {
  getOrders,
  getOrdersAllOne,
  getOrdersAllOneOrder,
  getOrdersAllOneUser,
} from '../../redux/action/order';
import {useDispatch, useSelector} from 'react-redux';

const OrderDetail = ({route, navigation}) => {
  const orderId = route.params.orderId;
  const [order, setOrder] = useState();
  const dispatch = useDispatch();
  function formatDate(dateString) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const {ordersAllOne} = useSelector(state => state.orderReducer);
  const {ordersAllOneUser} = useSelector(state => state.orderReducer);
  const {ordersAllOneUserOrder} = useSelector(state => state.orderReducer);
  // console.log('orderId', orderId);
  //item
  useEffect(() => {
    dispatch(getOrdersAllOne(orderId));
    // console.log('orderAllOne OrderId', orderId);
  }, [dispatch, orderId]);
  // console.log('OrderAllOne', ordersAllOne);
  //user
  useEffect(() => {
    dispatch(getOrdersAllOneUser(orderId));
    // console.log('orderAllOneUser OrderId', orderId);
  }, [dispatch, orderId]);
  // console.log('OrderAllOneUser', ordersAllOneUser);
  //order
  useEffect(() => {
    dispatch(getOrdersAllOneOrder(orderId));
    // console.log('orderAllOneUserOrder OrderId', orderId);
  }, [dispatch, orderId]);
  // console.log('OrderAllOneUserOrder', ordersAllOneUserOrder);
  // Membuat objek yang memetakan status pesanan asli ke label yang sesuai
  const statusLabelMap = {
    menunggu_konfirmasi: 'Menunggu Konfirmasi',
    batal: 'Batal',
    sedang_diproses: 'Sedang Diproses',
    siap_diantar: 'Siap Diantar',
    sedang_dikirim: 'Sedang Diantar',
    selesai: 'Selesai',
  };

  // Mengambil label status pesanan yang sesuai
  const statusLabel = statusLabelMap[ordersAllOneUserOrder.status_pesanan];
  return (
    <View>
      <View>
        <ScrollView>
          <Header
            title="Order Detail"
            subTitle="order detail"
            onBack={() => navigation.goBack()}
          />
          <View style={styles.content}>
            <Text style={styles.label}>Item Ordered</Text>
            <Text style={styles.label}>{orderId.id}</Text>
            {ordersAllOne.map(item => {
              return (
                <ItemListFood
                  key={item.id}
                  type="order-summary"
                  name={item.nama_food}
                  CardpriceCard={item.harga_food}
                  items={item.quantity}
                  price={item.harga_food}
                  // image={{uri: item.gambar_food}}
                  // items={item.quantity}
                />
              );
            })}
            <Text style={styles.details}>Detail Transaksi</Text>
            <ItemValue
              label="Total Harga"
              value={ordersAllOneUserOrder.total_harga}
              valueColor="#1ABC9C"
              type="currency"
            />
            <ItemValue
              label="Metode Pembayaran"
              value="Bayar Ditempat/COD"
              type="currency"
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Data Pemesan</Text>
            <ItemValue label="Nama" value={ordersAllOneUser.name} />
            <ItemValue label="Nomor Hp" value={ordersAllOneUser.nomor_hp} />
            <ItemValue label="Alamat" value={ordersAllOneUser.alamat} />
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Data Pengirim</Text>
            <ItemValue label="Nama" value={ordersAllOneUserOrder.nama_kurir} />
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Data Order</Text>
            <ItemValue
              label={`#${ordersAllOneUserOrder.id}`}
              value={statusLabel}
              valueColor={
                ordersAllOneUserOrder.status_pesanan ===
                  'menunggu_konfirmasi' ||
                ordersAllOneUserOrder.status_pesanan === 'batal'
                  ? '#D9435E'
                  : '#1ABC9C'
              }
            />
            <ItemValue
              label="Date"
              value={formatDate(ordersAllOneUserOrder.created_at)}
            />
          </View>
          {/* <View style={styles.button}>
          {order.status === 'Menunggu_Konfirmasi' && (
            <Button
              text="Cancel Order"
              onPress={onCancel}
              color="#D9435E"
              textColor="white"
            />
          )}
        </View> */}
          <View style={{height: 30}} />
        </ScrollView>
      </View>
    </View>
  );
};

export default OrderDetail;

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
