import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

const Select = ({label, value, onSelectChange}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={value}
          onValueChange={itemValue => onSelectChange(itemValue)}>
          <Picker.Item label="Bandung" value="Bandung" />
          <Picker.Item label="Tangerang Selatan" value="Tangerang_Selatan" />
          <Picker.Item label="Jakarta Barat" value="Jakarta_Barat" />
          <Picker.Item label="Jakarta Selatan" value="Jakarta_Selatan" />
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {fontSize: 16, fontFamily: 'Poppins-Medium', color: '#020202'},
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
  },
});
