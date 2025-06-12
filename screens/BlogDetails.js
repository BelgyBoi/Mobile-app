import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import GlobalContainer from '../globalElements/GlobalContainer.js';
import colors from '../styles/colors.js';
import textStyles from '../styles/text.js';

const BlogDetailsScreen = ({ route }) => {
  // Assuming the blog post object is passed via route params
  const { blogPost } = route.params;

  // Fallback for missing blog post data
  if (!blogPost) {
    return (
      <GlobalContainer>
        <View style={styles.container}>
          <Text style={styles.errorText}>Blog post not found.</Text>
        </View>
      </GlobalContainer>
    );
  }

  const { title, bodyText, author, date } = blogPost;

  return (
    <GlobalContainer>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={[styles.title, textStyles.heading1]}>{title || 'No Title'}</Text>
          
          {author && (
            <Text style={[styles.metaText, textStyles.caption]}>
              By: {author}
            </Text>
          )}
          {date && (
            <Text style={[styles.metaText, textStyles.caption]}>
              Published: {new Date(date).toLocaleDateString()}
            </Text>
          )}

          <View style={styles.separator} />

          <Text style={[styles.body, textStyles.defaultText]}>{bodyText || 'No content available.'}</Text>
        </View>
      </ScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },
  body: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify', // Or 'left' if preferred
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default BlogDetailsScreen;
