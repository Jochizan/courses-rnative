import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';

import CartItem from '../CarItem';
import cars from '../../services/cars';
import styles from './styles';

const CarList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CartItem car={item} />}
        showsVerticalScrollIndicator={false}
        snapToAlignment='start'
        decelerationRate='fast'
        snapToInterval={Dimensions.get('window').height}
      />
    </View>
  );
};

export default CarList;
