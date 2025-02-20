import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audi Rs7</Text>
      <Text style={styles.subtitle}>This is a very fast car</Text>
      <Text style={styles.price}>€120,000</Text>
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