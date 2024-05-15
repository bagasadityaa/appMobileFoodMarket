import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ItemListMenu = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../image/backRight.png')}
            style={styles.Image}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemListMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  imageContainer: {
    justifyContent: 'space-between',
  },
  Image: {
    width: 14,
    height: 14,
  },
});
