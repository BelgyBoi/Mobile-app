import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, Text } from 'react-native';

import ViewPort from '../components/ViewPort.js';
import colors from '../styles/colors.js';
import layoutStyles from '../styles/layout.js';

const GalleryScreen = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.webflow.com/v2/sites/67ac9ae63a5b794c54acd2f7/collections/684d62b6ef6aa7e85c27e3b1/items',
      {
        headers: {
          Authorization: 'Bearer 87929257d6887767501086aeed11c32ac4e586deadfd3dbf091789544ce74153',
          'accept-version': '1.0.0',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        const images = data.items?.[0]?.fieldData?.image || [];
        const shuffled = [...images].sort(() => Math.random() - 0.5);
        setGalleryImages(shuffled);
      })
      .catch(err => {
        console.error('Failed to fetch gallery images', err);
      });
  }, []);

  return (
    <ViewPort>
      
        <ScrollView contentContainerStyle={styles.container}>
          {galleryImages.length === 0 && (
            <BaselineText style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
              No images loaded
            </BaselineText>
          )}

          {galleryImages.map((img, index) => (
            <View key={img.fileId || index} style={layoutStyles.image}>
              <Image
                source={{ uri: img.url }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      
    </ViewPort>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: imageMargin,
    backgroundColor: colors.background,
  },
});

export default GalleryScreen;
