import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { title, subtitle, price } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.price}>€{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
    },
    price: {
        fontSize: 16,
        color: 'green',
    },

});

export default DetailsScreen;