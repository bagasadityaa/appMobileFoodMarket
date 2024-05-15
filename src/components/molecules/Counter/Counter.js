import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const Counter = ({onValueChange}) => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    onValueChange(value);
  }, [value]);
  const onCount = type => {
    let result = value;
    if (type === 'plus') {
      result = value + 1;
      // setValue(value + 1);
    }
    if (type === 'minus') {
      if (value > 1) {
        // setValue(value - 1);
        result = value - 1;
      }
    }
    setValue(result);
    onValueChange(result);
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity onPress={() => onCount('minus')}>
          <Text style={styles.minus}> - </Text>
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity onPress={() => onCount('plus')}>
          <Text style={styles.plus}> + </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    padding: 5,
  },
  value: {
    marginHorizontal: 11,
    color: 'black',
    fontSize: 15,
  },
  minus: {
    fontSize: 15,
    color: 'black',
  },
  plus: {
    fontSize: 15,
    color: 'black',
  },
});
