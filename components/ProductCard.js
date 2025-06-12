import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';
import layoutStyles from '../styles/layout.js';
import Spacer from '../globalElements/Spacer.js';
import colors from '../styles/colors.js';


const ProductCard = ({ title, subtitle, price, image, onPress }) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={[styles.text, styles.title]}>{title}</Text>
            <Spacer/>
            <Text style={[styles.text, styles.description]}>{subtitle}</Text>
            <Spacer/>
            <Text style={[styles.text, styles.price]}>€{price}</Text>
            <Spacer/>
            
            <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={[styles.text, styles.buttonText]}>View Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        ...layoutStyles.innerContainer,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        ...textStyles.defaultText,
    },
    title: {
        ...textStyles.header,
    },
    description: {
        textAlign: 'center',
    },
    price: {
        ...textStyles.highlight,
    },
    button: {
        ...buttonStyles.defaultButton,
    },
    buttonText: {
        ...textStyles.buttonText,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
});

export default ProductCard;
