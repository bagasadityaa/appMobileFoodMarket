import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Number} from '../Molecules';

const Rating = ({number}) => {
  const renderStar = () => {
    let star = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= number) {
        star.push(
          <Image
            style={{width: 18, height: 18}}
            source={require('../image/starsOn.png')}
            key={i}
          />,
        );
      } else {
        star.push(
          <Image
            style={{width: 18, height: 18}}
            source={require('../image/starsNone.png')}
            key={i}
          />,
        );
      }
    }
    return star;
  };
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.starContainer}>{renderStar()}</View>
      <Number style={styles.textRating} type="decimal" number={number} />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingContainer: {flexDirection: 'row'},
  starContainer: {flexDirection: 'row', marginRight: 4},
  textRating: {
    left: 9,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginTop: 2,
  },
});
