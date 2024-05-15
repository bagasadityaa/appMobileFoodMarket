import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {getFoodDatabyTypes} from '../../../redux/action/home';
import {Button} from '../../Components';
import {ItemListFood} from '../Molecules';
const renderTabBar = props => {
  const navigation = useNavigation();
  const [modalVisiblePopUp, setModalVisiblePopUp] = useState(false);

  const handleOpenModalPopUp = () => {
    setModalVisiblePopUp(true);
  };

  const handleCloseModalPopUp = () => {
    setModalVisiblePopUp(false);
  };
  return (
    <View>
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
      <View style={styles.containerButton}>
        <Button
          text="Keranjang"
          color="#8D92A3"
          textColor="#FAFAFA"
          onPress={() => navigation.navigate('Cart')}
          style={styles.button}
        />
      </View>
    </View>
  );
};
const Ayam = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {ayam} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDatabyTypes('ayam'));
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getFoodDatabyTypes('ayam'));
    setRefreshing(false);
  };
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 27}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {ayam.map(item => {
          return (
            <ItemListFood
              key={item.id}
              type="product"
              name={item.name}
              price={item.price}
              style={styles.item}
              // rating={item.rate}
              status={item.status}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('FoodDetail', item)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
const Bebek = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {bebek} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDatabyTypes('bebek'));
  }, []);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ScrollView>
        {bebek.map(item => {
          return (
            <ItemListFood
              key={item.id}
              type="product"
              name={item.name}
              price={item.price}
              style={styles.item}
              rating={item.rate}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('FoodDetail', item)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
const Ikan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {ikan} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDatabyTypes('ikan'));
  }, []);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ScrollView>
        {ikan.map(item => {
          return (
            <ItemListFood
              key={item.id}
              type="product"
              name={item.name}
              price={item.price}
              style={styles.item}
              rating={item.rate}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('FoodDetail', item)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
const Kuah = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {kuah} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDatabyTypes('kuah'));
  }, []);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ScrollView>
        {kuah.map(item => {
          return (
            <ItemListFood
              key={item.id}
              type="product"
              name={item.name}
              price={item.price}
              style={styles.item}
              rating={item.rate}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('FoodDetail', item)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
const Tambahan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {tambahan} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDatabyTypes('tambahan'));
  }, []);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ScrollView>
        {tambahan.map(item => {
          return (
            <ItemListFood
              key={item.id}
              type="product"
              name={item.name}
              price={item.price}
              style={styles.item}
              rating={item.rate}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('FoodDetail', item)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const Minuman = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {minuman} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDatabyTypes('minuman'));
  }, []);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ScrollView>
        {minuman.map(item => {
          return (
            <ItemListFood
              key={item.id}
              type="product"
              name={item.name}
              price={item.price}
              style={styles.item}
              rating={item.rate}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('FoodDetail', item)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const initialLayout = {width: Dimensions.get('window').width};
const renderScene = SceneMap({
  1: Ayam,
  2: Bebek,
  3: Ikan,
  4: Kuah,
  5: Tambahan,
  7: Minuman,
});

const HomeTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Ayam'},
    {key: '2', title: 'Bebek'},
    {key: '3', title: 'Ikan'},
    {key: '4', title: 'Kuah'},
    {key: '5', title: 'Tambahan'},
    {key: '7', title: 'Minuman'},
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

export default HomeTabSection;

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    marginLeft: 2,
  },
  containerButton: {
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
  },
  buttonPopUp: {
    backgroundColor: 'blue',
    color: 'white',
    height: 90,
    width: 90,
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
    backgroundColor: 'transparent',
  },
  containerButtonOpenPopUp: {
    position: 'relative',
  },
  modalContainerPopUp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    bottom: 73,
  },
  modalContentPopUp: {
    backgroundColor: 'white',

    borderRadius: 5,
  },
  closeButtonPopUp: {
    color: 'blue',
    textAlign: 'center',
    padding: 10,
    top: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
