// DetailsScreen.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import ViewPort from '../components/ViewPort';
import ContentWrapper from '../components/ContentWrapper';
import BaselineText from '../components/BaselineText';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import textStyles from '../styles/text'; 
import layoutStyles from '../styles/layout'; 
import buttonStyles from '../styles/button';

// 👉 import your image asset here:


const DetailsScreen = ({ route }) => {
  const { title, subtitle, price, image } = route.params;
  const [quantity, setQuantity] = React.useState(1);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ViewPort>
        <View>
          <Image source={image} style={layoutStyles.image} resizeMode="contain" />

      <ContentWrapper>
          <BaselineText style={textStyles.header}>{title}</BaselineText>
          <BaselineText>{subtitle}</BaselineText>
          <BaselineText style={textStyles.highlight}>€{price}</BaselineText>
      </ContentWrapper>

          <View style={layoutStyles.quantity}>
            <TouchableOpacity style={buttonStyles.secondaryButton} onPress={decreaseQuantity}>
              <BaselineText style={textStyles.buttonText}>–</BaselineText>
            </TouchableOpacity>

            <BaselineText style={textStyles.quantityText}>{quantity}</BaselineText>

            <TouchableOpacity style={buttonStyles.secondaryButton} onPress={increaseQuantity}>
              <BaselineText style={textStyles.buttonText}>+</BaselineText>
            </TouchableOpacity>
          </View>
        </View>
    </ViewPort>
  );
};

export default DetailsScreen;
