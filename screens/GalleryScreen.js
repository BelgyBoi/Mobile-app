import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, Text } from 'react-native';
import ViewPort from '../components/ViewPort.js';
import colors from '../styles/colors.js';
import layoutStyles from '../styles/layout.js';
import ContentWrapper from '../components/ContentWrapper.js';

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
    <ViewPort scroll style={{ backgroundColor: colors.secondary }}>
          {galleryImages.length === 0 && (
            <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
              No images loaded
            </Text>
          )}

          {galleryImages.map((img, index) => (
            <View key={img.fileId || index} style={[ { width: '100%' }]}>
              <Image
                source={{ uri: img.url }}
                style={[layoutStyles.image, {marginBottom: 1, }]}
                resizeMode="cover"
              />
            </View>
          ))}

    </ViewPort>
  );
};

const styles = StyleSheet.create({
  
});

export default GalleryScreen;
