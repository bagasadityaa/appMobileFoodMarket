import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Button} from '../../components/Components';

const SuccessSignUp = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Image
        style={{width: 190, height: 190}}
        source={require('../image/success.png')}
      />
      <Text style={styles.title}>Yeay registrasi berhasil</Text>
      <View style={{height: 2}} />
      <Text style={styles.subTitle}>Sekarang bisa pesan</Text>
      <View style={{height: 2}} />
      <Text style={styles.subTitle}>Some foods as a selfreward</Text>
      <View style={{height: 2}} />
      <View style={styles.ButtonContainer}>
        <Button
          text="Find Food"
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
          }
        />
      </View>
    </View>
  );
};

export default SuccessSignUp;

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
