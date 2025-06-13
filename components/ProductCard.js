import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';
import layoutStyles from '../styles/layout.js';
import Spacer from '../globalElements/Spacer.js';
import colors from '../styles/colors.js';
import ComponentContainer from '../globalElements/ComponentContainer.js';


const ProductCard = ({ title, subtitle, price, image, onPress }) => {
    const navigation = useNavigation();
    
    return (
        <ComponentContainer>
            <Image source={image} style={layoutStyles.image} />
            <Text style={[styles.text, textStyles.header]}>{title}</Text>
            <Spacer/>
            <Text style={[styles.text, textStyles.price]}>€{price}</Text>
            <Spacer/>
            
            <TouchableOpacity style={buttonStyles.defaultButton} onPress={onPress}>
            <Text style={[styles.text, textStyles.buttonText]}>View Product</Text>
            </TouchableOpacity>
        </ComponentContainer>
    );
};

const styles = StyleSheet.create({
    text: {
        ...textStyles.defaultText,
        ...textStyles.centerAlign,
    },
});

export default ProductCard;
