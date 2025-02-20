import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native'; 

import ProductCard from '../components/ProductCard.js';

const HomeScreen = (navigation) => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>View our brands</Text>

        <ScrollView style={styles.cardContainer}>
            <View style={styles.row}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
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