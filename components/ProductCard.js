// content
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';
import layoutStyles from '../styles/layout.js';
import colors from '../styles/colors.js';
import BaselineText from './BaselineText.js';
import ViewPort from './ViewPort.js';
import ContentWrapper from './ContentWrapper.js';


const ProductCard = ({ title, subtitle, price, image, onPress }) => {
    const navigation = useNavigation();
    
    return (
        <ViewPort>
            <TouchableOpacity onPress={onPress}>
            <Image source={image} style={layoutStyles.image} />
            <ContentWrapper>
            <BaselineText style={[textStyles.header]}>{title}</BaselineText>
           
            <BaselineText style={[textStyles.price]}>€{price},00</BaselineText>
            
            </ContentWrapper>
            </TouchableOpacity>
        </ViewPort>
    );
};

const styles = StyleSheet.create({
   
});

export default ProductCard;
