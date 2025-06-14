// screen
import React from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
import GlobalContainer from '../components/GlobalContainer.js';
import ViewPort from '../components/ViewPort.js';
import colors from '../styles/colors.js';

// Get screen dimensions
const { width } = Dimensions.get('window');
const imageMargin = 5;
const imageSize = (width - imageMargin * 4) / 2; // Two images per row with margins

// Hardcoded image paths - replace with your actual local image paths
// For local images, use require()
// Example: const images = [require('../assets/image1.jpg'), require('../assets/image2.png')];
// For now, using placeholder URIs. Replace these with your actual image sources.
const imageSources = [
  { id: '1', uri: 'https://via.placeholder.com/300/FF0000/FFFFFF?Text=Image1' },
  { id: '2', uri: 'https://via.placeholder.com/300/00FF00/FFFFFF?Text=Image2' },
  { id: '3', uri: 'https://via.placeholder.com/300/0000FF/FFFFFF?Text=Image3' },
  { id: '4', uri: 'https://via.placeholder.com/300/FFFF00/000000?Text=Image4' },
  { id: '5', uri: 'https://via.placeholder.com/300/FF00FF/FFFFFF?Text=Image5' },
  { id: '6', uri: 'https://via.placeholder.com/300/00FFFF/000000?Text=Image6' },
  // Add more image objects as needed
];

const GalleryScreen = () => {
  return (
    <ViewPort>
      <GlobalContainer>
        <ScrollView contentContainerStyle={styles.container}>
          {imageSources.map(image => (
            <View key={image.id} style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.image} resizeMode="cover" />
            </View>
          ))}
        </ScrollView>
      </GlobalContainer>
    </ViewPort>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align items to the start of the row
    padding: imageMargin,
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    margin: imageMargin,
    backgroundColor: colors.surface, // Placeholder background for the image container
    borderRadius: 8,
    overflow: 'hidden', // Ensures the image respects the border radius
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default GalleryScreen;
