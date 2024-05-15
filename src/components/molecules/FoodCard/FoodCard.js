import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Rating} from '../Molecules';

const FoodCard = ({image, name, rating, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View>
          <Text style={styles.text}> {name}</Text>
          <View style={styles.Rating}>
            <Rating number={rating} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: 'white',
    boderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    borderRadius: 8,
    overfow: 'hidden',
    marginRight: 32,
    height: 200,
  },
  image: {
    width: 200,
    height: 140,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  text: {
    top: 5,
    left: 5,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  Rating: {
    marginLeft: 10,
  },
});
