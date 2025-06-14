import React from 'react';
;import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors.js'; 
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';
import layoutStyles from '../styles/layout.js';
import spacing from '../styles/spacing.js'; 


const BlogCard = ({ title, thumbnailUri, summary, date, onPress }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString() : 'Date not available';

  return (

      {thumbnailUri ? (
        <Image source={{ uri: thumbnailUri }} style={layoutStyles.image}/>
      ) : (
        <View>
          <BaselineText style={textStyles.placeholderText}>No Image</BaselineText>
        </View>
      )}
        
           <BaselineText style={[styles.text, textStyles.header]} numberOfLines={2} ellipsizeMode="tail">
             {title || 'Untitled Post'}
           </BaselineText>
            
           <BaselineText style={styles.text} numberOfLines={3} ellipsizeMode="tail">
             {summary || 'No summary available.'}
           </BaselineText>
            
           <BaselineText style={[styles.text, textStyles.metaText, {alignSelf: 'left', marginLeft: 16}]}>{formattedDate}</BaselineText>
              
           <TouchableOpacity style={buttonStyles.defaultButton} onPress={onPress}> 
               <BaselineText style={[styles.text, textStyles.buttonText]}>Read More</BaselineText>
           </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  text: {
    ...textStyles.defaultText,
  },
});

export default BlogCard;
