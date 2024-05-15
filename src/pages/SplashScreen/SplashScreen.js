import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getData} from '../../utils/utils';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      getData('token').then(res => {
        // console.log('token: ', res);
        if (res) {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        } else {
          navigation.replace('Signin');
        }
      });
    }, 2000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#7A4141',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: 302, height: 154}}
        source={require('../image/Logo.png')}
      />
    </View>
  );
};

export default SplashScreen;
