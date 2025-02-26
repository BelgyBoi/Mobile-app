import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native'; 

import ProductCard from '../components/ProductCard.js';

import RS7_Image from "../images/audi-rs7/rs7_1.webp";
import GT3RS_Image from "../images/porsche-GT3RS/Porsche_GT3RS_1.jpg";

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>View our brands</Text>

        <ScrollView style={styles.cardContainer}>
            <View style={styles.row}>   
                <ProductCard
                title="Audi RS7"
                subtitle="Experience comfort and excellence"
                price="120,000"
                image={RS7_Image}
                onPress={() => 
                  navigation.navigate('Details', {
                    title: 'Audi RS7',
                    subtitle: 'Experience comfort and excellence',
                    price: '120,000',
                  })
                }
                />
                <ProductCard 
                title="Porsche GT3 RS"
                subtitle="Experience speed and power"
                price="350,000"
                image={GT3RS_Image}
                onPress={() => 
                  navigation.navigate('Details', {
                    title: 'Porsche GT3 RS',
                    subtitle: 'Experience speed and power',
                    price: '350,000',
                  })
                }
                />
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