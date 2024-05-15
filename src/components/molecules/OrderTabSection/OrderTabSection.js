import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress, getPastOrders} from '../../../redux/action/order';
import {ItemListFood} from '../Molecules';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 4,
      width: 1,
      marginLeft: 1,
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: 'auto'}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);
const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inProgress} = useSelector(state => state.orderReducer);

  useEffect(() => {
    dispatch(getInProgress());
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getInProgress());
    setRefreshing(false);
  };

  return (
    // <View>
    //   <Text>Ini adalah</Text>

    // </View>
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.containerInProgress}>
        {inProgress.map(order => {
          return (
            <ItemListFood
              key={order.id}
              onPress={() =>
                navigation.navigate('OrderDetail', {orderId: order.id})
              }
              type="in-progress"
              name={order.id}
              date={order.created_at}
              status={order.status_pesanan}
              CardpriceCard={order.total_harga}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
const PastOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pastOrders} = useSelector(state => state.orderReducer);

  useEffect(() => {
    dispatch(getPastOrders());
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getPastOrders());
    setRefreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        {pastOrders.length < 1 ? (
          <View style={styles.containerWait}>
            <Image
              source={require('../image/food.png')}
              style={styles.imageWait}
            />
            <Text style={styles.textWait}>Mohon Ditunggu Sebentar</Text>
            <Text style={styles.textWait}>Pesanan sedang dibuat</Text>
          </View>
        ) : (
          <View style={styles.containerPastOrders}>
            {pastOrders.map(order => {
              return (
                <ItemListFood
                  key={order.id}
                  // image={{uri: order.food.gambar_food}}
                  onPress={() =>
                    navigation.navigate('OrderDetail', {orderId: order.id})
                  }
                  type="past-orders"
                  CardpriceCard={order.total_harga}
                  name={order.id}
                  date={order.created_at}
                  status={order.status_pesanan}
                />
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const initialLayout = {width: Dimensions.get('window').width};
const renderScene = SceneMap({
  1: PastOrders,
  2: InProgress,
});

const OrderTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Riwayat Pesanan'},
    {key: '2', title: 'Sedang diproses'},
  ]);
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default OrderTabSection;

const styles = StyleSheet.create({
  item: {
    marginLeft: 2,
  },

  containerWait: {
    flex: 1,
    marginTop: 160,
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
});
