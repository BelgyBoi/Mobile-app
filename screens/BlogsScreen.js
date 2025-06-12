
import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GlobalContainer from '../globalElements/GlobalContainer.js';
import colors from '../styles/colors.js';
import textStyles from '../styles/text.js';
import layoutStyles from '../styles/layout.js';
import CloseButton from '../globalElements/CloseButton.js';

// Blog Post Card Component (Simplified)
const BlogPostCard = ({ title, shortText, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={[styles.cardTitle, textStyles.heading3]}>{title}</Text>
    <Text style={[styles.cardShortText, textStyles.defaultText]}>{shortText}</Text>
  </TouchableOpacity>
);

const BlogsScreen = ({ navigation }) => {
  const [blogPosts, setBlogPosts] = useState([]); // Initialize with empty array
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: Replace with your actual API call
    // const fetchBlogPosts = async () => {
    //   try {
    //     // const response = await fetch('YOUR_API_ENDPOINT_HERE');
    //     // const data = await response.json();
    //     // const formattedData = data.items.map(item => ({ // Adjust mapping based on your API structure
    //     //   id: item.id, // Replace with actual ID key from your API data
    //     //   title: item.title, // Replace with actual title key
    //     //   shortText: item.shortText, // Replace with actual shortText key
    //     //   bodyText: item.bodyText, // Replace with actual bodyText key
    //     //   author: item.author, // Optional: replace with actual author key
    //     //   date: item.date, // Optional: replace with actual date key
    //     // }));
    //     // setBlogPosts(formattedData);
    //     console.log('API call placeholder: Fetch blog posts here and map them to the expected structure.');
    //   } catch (error) {
    //     console.error("Failed to fetch blog posts:", error);
    //     // Optionally, set an error state here to display to the user
    //   }
    // };
    // fetchBlogPosts();
    console.log("useEffect triggered: This is where you'd fetch blog posts from an API.");
  }, []); // Empty dependency array means this runs once on mount

  const filteredBlogPosts = useMemo(() => {
    if (!searchQuery) {
      return blogPosts;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return blogPosts.filter(post =>
      (post.title && post.title.toLowerCase().includes(lowerCaseQuery)) ||
      (post.shortText && post.shortText.toLowerCase().includes(lowerCaseQuery)) ||
      (post.bodyText && post.bodyText.toLowerCase().includes(lowerCaseQuery))
    );
  }, [blogPosts, searchQuery]);

  return (
    <GlobalContainer>
      <View style={styles.topContainer}>
        {/* Search bar with clear button */}
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.text, styles.searchInput]}
            placeholder="Search blog posts..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <CloseButton onPress={() => setSearchQuery('')} />
          )}
        </View>
      </View>

      {/* Blog Post cards */}
      <ScrollView style={styles.cardContainer}>
        {filteredBlogPosts.length > 0 ? (
          filteredBlogPosts.map((post) => (
            <BlogPostCard
              key={post.id} // Ensure your API data provides a unique id for each post
              title={post.title || 'No Title'} // Fallback for missing title
              shortText={post.shortText || 'No short text available'} // Fallback for missing shortText
              onPress={() => {
                // Navigate to BlogDetailScreen (to be created)
                // navigation.navigate('BlogDetail', { blogPost: post });
                console.log('Navigate to blog post:', post.title); // Placeholder
              }}
            />
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              {blogPosts.length === 0 && !searchQuery ? 'Loading blog posts or none available.' : 'No blog posts found matching your search.'}
            </Text>
          </View>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    ...textStyles.defaultText,
  },
  topContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 10, // Added padding top
    marginBottom: 10,
  },
  searchContainer: {
    ...layoutStyles.SearchBar, // Assuming this provides flex row, align items center etc.
    // If not, add:
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: colors.surface,
    // borderRadius: 8,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: colors.border,
  },
  searchInput: {
    flex: 1, // Takes available space
    fontSize: 16,
    paddingVertical: 10, // Adjust for better touch area and appearance
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    color: colors.primary,
    marginBottom: 5,
  },
  cardShortText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default BlogsScreen;
