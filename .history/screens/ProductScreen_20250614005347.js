// ✅ Fully updated ProductScreen.js with global styles applied
import React from 'react';
;import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ViewPort from '../components/ViewPort';
import { buttonStyles } from '../styles/button';
import { layout } from '../styles/layout';
import { textStyles } from '../styles/text';
import { colors } from '../styles/colors';

const ProductScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    
      <ViewPort>
        <TouchableOpacity
          style={buttonStyles.backButton}
          onPress={handleBackPress}
        >
          <BaselineText style={textStyles.backButtonText}>{'<'} Back</BaselineText>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={layout.scrollContainer}>
          <View style={layout.imageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300' }}
              style={layout.productImage}
            />
          </View>

          <BaselineText style={textStyles.productTitle}>Product Title</BaselineText>
          <BaselineText style={textStyles.productPrice}>$99.99</BaselineText>
          <BaselineText style={textStyles.productDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            fermentum, quam sed luctus lacinia, massa arcu tincidunt arcu, sed
            facilisis elit tellus in justo.
          </BaselineText>
        </ScrollView>
      </ViewPort>
    
  );
};

export default ProductScreen;
