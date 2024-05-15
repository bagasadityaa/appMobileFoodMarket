import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../../../utils/utils';
import {ProfileLogo} from '../../../assets/Assets';
import {useNavigation} from '@react-navigation/native';

const HomeProfile = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(require('../image/people.png'));
  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('userProfile').then(res => {
        // console.log('User Profile: ', res);
        setPhoto({uri: res.profile_photo_url});
      });
    });
  }, [navigation]);

  return (
    <View style={styles.containerProfile}>
      <View>
        <Text style={styles.textApp}>Hai, Selamat datang</Text>
        <Text style={styles.desc}>Let's get some food</Text>
      </View>
      <Image style={styles.profile} source={photo} />
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  containerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: 'white',
  },
  textApp: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  desc: {fontSize: 14, fontFamily: 'Poppins-Light', color: '#8D92A3'},
  profile: {
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
