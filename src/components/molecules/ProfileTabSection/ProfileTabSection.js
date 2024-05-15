import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {ItemListMenu} from '../Molecules';
import {useState} from 'react';
import {useEffect} from 'react';
import {getData} from '../../../utils/utils';
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
const Account = () => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);
  const navigation = useNavigation();
  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'Signin'}]});
    });
  };
  // console.log('userProfile', userProfile);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListMenu
        text="Profile"
        onPress={() => navigation.navigate('UpdateProfile', userProfile)}
      />
      {/* <ItemListMenu text="Security" />
      <ItemListMenu text="Payments" /> */}
      <ItemListMenu text="SignOut" onPress={signOut} />
    </View>
  );
};
const Informasi = () => {
  const navigation = useNavigation();
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListMenu
        text="Jam Buka"
        onPress={() => navigation.navigate('JamBuka')}
      />
    </View>
  );
};

const initialLayout = {width: Dimensions.get('window').width};
const renderScene = SceneMap({
  1: Account,
  2: Informasi,
});

const ProfileTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Account'},
    {key: '2', title: 'Informasi'},
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

export default ProfileTabSection;

const styles = StyleSheet.create({
  item: {
    marginLeft: 2,
  },
});
