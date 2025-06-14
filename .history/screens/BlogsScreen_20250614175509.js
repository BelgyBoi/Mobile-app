// screen
import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import colors from '../styles/colors.js';
import BlogCard from '../components/BlogCard.js';
import BaselineText from '../components/BaselineText.js';

const BlogsScreen = ({ navigation }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/67ac9ae63a5b794c54acd2f7/collections/67bdad5ab093c84c85dfd503/items?live=true",
      {
        headers: {
          Authorization:
          "Bearer 87929257d6887767501086aeed11c32ac4e586deadfd3dbf091789544ce74153",
          "accept-version": "1.0.0",
        },
      }
    )
    .then((res) => res.json())
    .then((data) => {
      if (data.items) {
        setBlogPosts(
          data.items.map((item) => ({
            id: item.id,
            title: item.fieldData?.name,
            summary: item.fieldData?.["post-summary"],
            bodyText: item.fieldData?.["blog-body-text"],
            thumbnailUri: item.fieldData?.["thumbnail-image"]?.url || item.fieldData?.["main-image"]?.url,
            mainImageUri: item.fieldData?.["main-image"]?.url,
            slug: item.fieldData?.slug,
            date: item.fieldData?.["publication-date"],
            author: item.fieldData?.author,
          }))
        );
      } else {
        setBlogPosts([]);
      }
    })
    .catch(() => setBlogPosts([]));
  }, []);

  const filteredBlogPosts = useMemo(() => {
    if (!searchQuery) {
      return blogPosts;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return blogPosts.filter(post =>
      (post.title && post.title.toLowerCase().includes(lowerCaseQuery)) ||
      (post.slug && post.slug.toLowerCase().includes(lowerCaseQuery)) ||
      (post.summary && post.summary.toLowerCase().includes(lowerCaseQuery)) ||
      (post.bodyText && post.bodyText.toLowerCase().includes(lowerCaseQuery))
    );
  }, [blogPosts, searchQuery]);

  return (
    <ViewPort style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search blog posts..."
          placeholderTextColor={colors.ghosted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ViewPort>
      <ViewPoint scroll contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredBlogPosts.length > 0 ? (
          filteredBlogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              summary={post.summary}
              thumbnailUri={post.thumbnailUri}
              date={post.date}
              onPress={() => {
                navigation.navigate('BlogDetail', { blogPost: post });
              }}
            />
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <BaselineText style={styles.noResultsText}>
              {blogPosts.length === 0 && !searchQuery ? 'Loading blog posts or none available.' : 'No blog posts found matching your search.'}
            </BaselineText>
          </ViewPoint>
        )}
    </ViewPort>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.ghosted,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchInput: {
    fontSize: 16,
    color: colors.primary,
    paddingVertical: 8,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.ghosted,
  },
});

export default BlogsScreen;
