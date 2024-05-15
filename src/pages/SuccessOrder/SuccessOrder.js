import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '../../components/Components';

const SuccessOrder = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Image
        style={{width: 150, height: 150}}
        source={require('../image/iconMasak.png')}
      />
      <Text style={styles.title}>Pesananmu sedang di Proses </Text>
      <View style={{height: 2}} />
      <Text style={styles.subTitle}>Mohon ditunggu sebentar</Text>
      <View style={{height: 10}} />
      <View style={styles.ButtonContainer}>
        <Button
          text="Find Food"
          onPress={() => navigation.replace('MainApp')}
        />
        <View style={{height: 10}} />
        <Button
          text="Lihat Transaksi"
          onPress={() => navigation.navigate('Order')}
        />
      </View>
    </View>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  subTitle: {fontSize: 14, fontFamily: 'Popping-Light', color: '#8D92A3'},
  ButtonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
});
