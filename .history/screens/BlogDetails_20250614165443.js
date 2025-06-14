import React from 'react';
;import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import colors from '../styles/colors.js';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import layoutStyles from '../styles/layout.js';
import textStyles from '../styles/text.js';
import ViewPort from '../components/ViewPort.js';

// *


const BlogDetailsScreen = ({ route }) => {
  // Assuming the blog post object is passed via route params
  const { blogPost } = route.params;
  const { width } = useWindowDimensions();

  // Fallback for missing blog post data
  if (!blogPost) {
    return (
      <View style={styles.container}>
        <BaselineText style={styles.errorText}>Blog post not found.</BaselineText>
      </View>
    );
  }

  const { title, bodyText, author, date, mainImageUri } = blogPost;

  return (
    <ScrollView style={styles.scrollContainer}>
        <ViewPort >
        
        <BaselineText style={styles.title}>{title || 'No Title'}</BaselineText>
        {mainImageUri ? (
          <Image 
            source={{ uri: mainImageUri }} 
            style={[layoutStyles.image, {flex:1, marginBottom: 10}]} 
            resizeMode="cover"
          />
        ) : (
          <BaselineText style={[textStyles.defaultText, styles.errorText]}>Failed to load image</BaselineText>
        )}
        
        {author && (
          <BaselineText style={styles.metaText}>
            By: {author}
          </BaselineText>
        )}
        {date && (
          <BaselineText style={styles.metaText}>
            Published: {new Date(date).toLocaleDateString()}
          </BaselineText>
        )}
  
        <View style={styles.separator} />

        {bodyText ? (
          <RenderHTML
            contentWidth={width}
            source={{ html: bodyText }}
            tagsStyles={{
              p: styles.body, // apply your existing style to <p> tags
            }}
          />
        ) : (
          <BaselineText style={styles.body}>No content available.</BaselineText>
        )}
        
        </ViewPort>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  metaText: {
    color: colors.ghosted,
    fontSize: 14,
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: colors.ghosted,
    marginVertical: 15,
  },
  body: {
    color: colors.primary,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    fontWeight: 'thin',
    paddingVertical: 20,
  },
});

export default BlogDetailsScreen;
