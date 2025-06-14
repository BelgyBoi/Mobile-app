// content
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors.js'; 
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';
import layoutStyles from '../styles/layout.js';
import spacing from '../styles/spacing.js'; 
import BaselineText from './BaselineText.js';
import ViewPort from './ViewPort.js';
import ContentWrapper from './ContentWrapper.js';


const BlogCard = ({ title, thumbnailUri, summary, date, onPress }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString() : 'Date not available';

  return (
    <ViewPort>
      <TouchableOpacity onPress={onPress}> 
      {thumbnailUri ? (
        <Image source={{ uri: thumbnailUri }} style={ layoutStyles.image }/>
      ) : (
        <View>
          <BaselineText style={textStyles.placeholderText}>No Image</BaselineText>
        </View>
      )}
        <ContentWrapper>
           <BaselineText style={[, textStyles.header]} numberOfLines={2} ellipsizeMode="tail">
             {title || 'Untitled Post'}
           </BaselineText>
            
           <BaselineText numberOfLines={3} ellipsizeMode="tail">
             {summary || 'No summary available.'}
           </BaselineText>
            
           <BaselineText style={[textStyles.metaText]}>{formattedDate}</BaselineText>
              
        </ContentWrapper>
           </TouchableOpacity>
    </ViewPort>
  );
};

const styles = StyleSheet.create({
  
});

export default BlogCard;
