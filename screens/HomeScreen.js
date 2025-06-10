import React, {useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native'; 
import ProductCard from '../components/ProductCard.js';

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/67ac9ae63a5b794c54acd2f7/products",
      {
        headers: {
          Authorization:
          "Bearer 87929257d6887767501086aeed11c32ac4e586deadfd3dbf091789544ce74153",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => 
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100, // Convert cents to dollars
            image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
          }))
        ) 
      )
      .catch((error) => console.error("Error fetching products:", error));
    }, []);
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>View our brands</Text>

        <ScrollView style={styles.cardContainer}>
            <View style={styles.row}>   
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  image={product.image}
                  onPress={() => navigation.navigate('Details', { productId: product.id })}
                />
              ))}   
            </View>
          </ScrollView>
        <StatusBar style="auto" />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: '#fff',
      justifyContent: 'center', // Vertically center
      alignItems: 'center', // Horizontally center
      maxWidth: '95%',
      maxHeight: '95%',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
    },
    cardContainer: {
      width: '100%',
      marginTop: 20,
    },
  });
  

export default HomeScreen;