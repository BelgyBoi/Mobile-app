import React from 'react';
;import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import colors from '../styles/colors.js';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';


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

  const { title, bodyText, author, date } = blogPost;

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <BaselineText style={styles.title}>{title || 'No Title'}</BaselineText>
        <Image>{thumbnailUri}</Image>
        
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
      </View>
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  metaText: {
    color: colors.ghosted,
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
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
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BlogDetailsScreen;
