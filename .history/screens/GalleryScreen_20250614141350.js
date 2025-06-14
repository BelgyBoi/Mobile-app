import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
import GlobalContainer from '../globalElements/GlobalContainer.js';
import ViewPort from '../globalElements/ViewPort.js';
import colors from '../styles/colors.js';

const { width } = Dimensions.get('window');
const imageSize = (width - imageMargin * 4) / 2; // Two images per row with margins

const GalleryScreen = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "https://api.webflow.com/v2/sites/67ac9ae63a5b794c54acd2f7/collections/684d62b6ef6aa7e85c27e3b1/items",
          {
            headers: {
              Authorization:
                "Bearer 87929257d6887767501086aeed11c32ac4e586deadfd3dbf091789544ce74153",
              "accept-version": "1.0.0",
            },
          }
        );

        

        const data = await response.json();
        const images = data.items[0]?.image || [];

        // Shuffle the array for random layout
        const shuffled = [...images].sort(() => Math.random() - 0.5);
        setGalleryImages(shuffled);
      } catch (err) {
        console.error('Failed to fetch gallery images', err);
      }
    };

    fetchGallery();
  }, []);

  return (
    <ViewPort>
      <GlobalContainer>
        <ScrollView contentContainerStyle={styles.container}>
          {galleryImages.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri: image.url }}
                style={styles.image}
                resizeMode="cover"
              />
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
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    margin: imageMargin,
    backgroundColor: colors.surface,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default GalleryScreen;
