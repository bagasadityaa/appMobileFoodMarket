import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Counter = ({onKurang, onTambah, isCounter, jumlahItem}) => {
  return (
    <View style={styles.counterContainer}>
      {isCounter ? (
        <View style={styles.counterButtonContainer}>
          <TouchableOpacity onPress={onKurang}>
            <View style={styles.counterButton}>
              <Text style={styles.counterButtonText}>-</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.counterText}>{jumlahItem}</Text>
          <TouchableOpacity onPress={onTambah}>
            <View style={styles.counterButton}>
              <Text style={styles.counterButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onTambah}>
          <View style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>Tambah</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CounterCart;

const styles = StyleSheet.create({});
