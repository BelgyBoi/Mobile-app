import React from 'react';
;import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';
import layoutStyles from '../styles/layout.js';
import colors from '../styles/colors.js';
import ComponentContainer from './ComponentContainer.js';


const ProductCard = ({ title, subtitle, price, image, onPress }) => {
    const navigation = useNavigation();
    
    return (
    
            <Image source={image} style={layoutStyles.image} />
            <BaselineText style={[styles.text, textStyles.header]}>{title}</BaselineText>
           
            <BaselineText style={[styles.text, textStyles.price]}>€{price}</BaselineText>
           
            
            <TouchableOpacity style={buttonStyles.defaultButton} onPress={onPress}>
            <BaselineText style={[styles.text, textStyles.buttonText]}>View Product</BaselineText>
            </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    text: {
        ...textStyles.defaultText,
        ...textStyles.centerAlign,
    },
});

export default ProductCard;
