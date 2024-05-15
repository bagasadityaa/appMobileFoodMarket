import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({text, color = '#7A4141', textColor = '#FAFAFA', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color)}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: color => ({
    backgroundColor: color,
    padding: 18,
    borderRadius: 8,
  }),
  text: color => ({
    fontSize: 14,
    fontFamily: 'Poopins-Medium',
    color: color,
    textAlign: 'center',
  }),
});
