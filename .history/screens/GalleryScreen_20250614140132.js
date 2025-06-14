import React from 'react';
;import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
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
fetch(
      "https://api.webflow.com/v2/sites/67ac9ae63a5b794c54acd2f7/collections/684d62b6ef6aa7e85c27e3b1/items",
      {
        headers: {
          Authorization:
          "Bearer 87929257d6887767501086aeed11c32ac4e586deadfd3dbf091789544ce74153",
          "accept-version": "1.0.0",
        },
      }
    )

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
