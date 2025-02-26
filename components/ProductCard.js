import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ProductCard = ({ title, subtitle, price, image, onPress }) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{subtitle}</Text>
            <Text style={styles.price}>€{price}</Text>
            
            <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>View Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        maxWidth: '95%',
        maxHeight: '95%',
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
});

export default ProductCard;
