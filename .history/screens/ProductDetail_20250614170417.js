import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GlobalContainer from '../components/GlobalContainer';
import ViewPort from '../components/ViewPort';
import BaselineText from '../components/BaselineText.js';

const DetailsScreen = ({ route }) => {
  const { title, subtitle, price } = route.params;
  const [quantity, setQuantity] = React.useState(1);
  
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <ViewPort>
      <GlobalContainer>
        <View style={styles.container}>
          <BaselineText style={styles.title}>{title}</BaselineText>
          <BaselineText style={styles.subtitle}>{subtitle}</BaselineText>
          <BaselineText style={styles.price}>€{price}</BaselineText>

          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
              <BaselineText style={styles.buttonText}>-</BaselineText>
            </TouchableOpacity>

            <BaselineText style={styles.quantity}>{quantity}</BaselineText>

            <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
              <BaselineText style={styles.buttonText}>+</BaselineText>
            </TouchableOpacity>
          </View>
        </View>
      </GlobalContainer>
    </ViewPort>
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

    quantityContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    quantity: {
        fontSize: 24,
        marginHorizontal: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },

});

export default DetailsScreen;