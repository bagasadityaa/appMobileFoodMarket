import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Home':
      return focus ? (
        <Image
          style={{justifyContent: 'center', width: 40, height: 40}}
          source={require('../image/home_on.png')}
        />
      ) : (
        <Image
          style={{justifyContent: 'center', width: 40, height: 40}}
          source={require('../image/home.png')}
        />
      );
    case 'Order':
      return focus ? (
        <Image
          style={{justifyContent: 'center', width: 40, height: 40}}
          source={require('../image/cart_on.png')}
        />
      ) : (
        <Image
          style={{justifyContent: 'center', width: 40, height: 40}}
          source={require('../image/cart.png')}
        />
      );
    case 'Profile':
      return focus ? (
        <Image
          style={{justifyContent: 'center', width: 40, height: 40}}
          source={require('../image/profile_on.png')}
        />
      ) : (
        <Image
          style={{justifyContent: 'center', width: 40, height: 40}}
          source={require('../image/profile.png')}
        />
      );
    default:
      return (
        <Image
          style={{justifyContent: 'center', width: 40, height: 40}}
          source={require('../image/home_on.png')}
        />
      );
  }
};

const BottomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            {/* <Image
              style={{justifyContent: 'center', width: 40, height: 40}}
              source={require('../image/home_on.png')}
            /> */}
            <Icon label={label} focus={isFocused} />
            {/* <Text>{label}</Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 13,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});
