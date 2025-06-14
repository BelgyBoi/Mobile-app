import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors.js'; 
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';
import layoutStyles from '../styles/layout.js';
import ComponentContainer from './ComponentContainer.js';
import Spacer from './Spacer.js';


const BlogCard = ({ title, thumbnailUri, summary, date, onPress }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString() : 'Date not available';

  return (
    <ComponentContainer>
      {thumbnailUri ? (
        <Image source={{ uri: thumbnailUri }} style={layoutStyles.image}/>
      ) : (
        <View>
          <Text style={textStyles.placeholderText}>No Image</Text>
        </View>
      )}
        <Spacer />
           <Text style={[styles.text, textStyles.header]} numberOfLines={2} ellipsizeMode="tail">
             {title || 'Untitled Post'}
           </Text>
            <Spacer />
           <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
             {summary || 'No summary available.'}
           </Text>
            <Spacer />
           <Text style={[styles.text, textStyles.metaText, {alignSelf: 'left', marginLeft: 16}]}>{formattedDate}</Text>
              <Spacer />
           <TouchableOpacity style={buttonStyles.defaultButton} onPress={onPress}> 
               <Text style={[styles.text, textStyles.buttonText]}>Read More</Text>
           </TouchableOpacity>
    </ComponentContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    ...textStyles.defaultText,
  },
});

export default BlogCard;
