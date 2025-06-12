import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GlobalContainer from '../globalElements/GlobalContainer.js';
import colors from '../styles/colors.js';
import textStyles from '../styles/text.js';

// Placeholder for hero image - replace with your actual image path
const heroImage = require('../assets/Volkswagen_group_logo.png'); // Example, replace with a relevant hero image

const HomeScreen = ({ navigation }) => {
  // Placeholder navigation links - update these with your actual screen names and routes
  const navLinks = [
    { id: '1', title: 'Browse All Cars', screen: 'ProductScreen' }, // Assuming ProductScreen shows all cars
    { id: '2', title: 'Search Cars', screen: 'SearchScreen' }, // Placeholder for a dedicated search screen if you have one
    { id: '3', title: 'My Favorites', screen: 'FavoritesScreen' }, // Placeholder
    { id: '4', title: 'Account Settings', screen: 'SettingsScreen' }, // Placeholder
    // Add more links as needed
  ];

  return (
    <GlobalContainer>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerText, textStyles.heading1]}>Welcome to Car Hub</Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={heroImage} style={styles.heroImage} resizeMode="contain" />
        </View>

        {/* Navigation Links */}
        <View style={styles.navContainer}>
          <Text style={[styles.navTitle, textStyles.heading2]}>Explore</Text>
          {navLinks.map((link) => (
            <TouchableOpacity
              key={link.id}
              style={styles.navLink}
              onPress={() => navigation.navigate(link.screen, { /* parameters if any */ })}
            >
              <Text style={[styles.navLinkText, textStyles.defaultText]}>{link.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: colors.primary, // Or your desired header background color
  },
  headerText: {
    color: colors.white, // Assuming white text on primary color
    fontWeight: 'bold',
  },
  heroContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  heroImage: {
    width: '100%',
    height: 200, // Adjust as needed
    borderRadius: 10, // Optional: if you want rounded corners
  },
  navContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  navTitle: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.text,
  },
  navLink: {
    backgroundColor: colors.surface, // A light background for links
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%', // Full width
    alignItems: 'center', // Center text within the TouchableOpacity
    borderWidth: 1,
    borderColor: colors.border,
  },
  navLinkText: {
    color: colors.primary, // Link text color
    fontWeight: '500',
    fontSize: 16,
  },
});

export default HomeScreen;