import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../styles/colors.js';
import textStyles from '../styles/text.js';
import layoutStyles from '../styles/layout.js';
import ViewPort from '../components/ViewPort.js';
import BaselineText from '../components/BaselineText.js';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const NAV_LINKS = [
  { id: '1', icon: <MaterialIcons name="directions-car" size={24} color={colors.secondary} />, title: 'Browse Products', screen: 'ProductScreen' },
  { id: '2', icon: <MaterialIcons name="article" size={24} color={colors.secondary} />, title: 'Read Our Blog', screen: 'Blogs' },
  { id: '3', icon: <Ionicons name="images-outline" size={24} color={colors.secondary} />, title: 'View Gallery', screen: 'Gallery' },
  { id: '4', icon: <Ionicons name="settings-outline" size={24} color={colors.secondary} />, title: 'User Preferences', screen: 'Preferences' },
];

const HERO_HEIGHT = 240;

const HomeScreen = ({ navigation }) => {
  return (
    <ViewPort>
      {/* Hero Image with black-to-transparent gradient at the bottom */}
      <View style={styles.heroContainer}>
        <Image source={require('../assets/hero_section_image.png')} style={styles.heroImage} resizeMode="cover" />
        <LinearGradient
          colors={["#ffffff00", "#ffffffcc", "#fff"]} // Transparent to white, for a soft fade
          style={styles.heroGradient}
          locations={[0.5, 0.8, 1]}
        />
      </View>
      {/* Navigation section */}
      <View style={styles.menuSection}>
        {NAV_LINKS.map((link, idx) => (
          <View key={link.id}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(link.screen)}>
              <View style={styles.menuIcon}>{link.icon}</View>
              <BaselineText style={textStyles.homeNav}>{link.title}</BaselineText>
            </TouchableOpacity>
            {idx < NAV_LINKS.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
      <StatusBar style="dark" />
    </ViewPort>
  );
};

const styles = StyleSheet.create({

  heroContainer: {
    width: '100%',
    height: HERO_HEIGHT,
    position: 'relative',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: HERO_HEIGHT,
    width: '100%',
  },
  menuSection: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuIcon: {
    marginRight: 16,
  },
  separator: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 8,
  },
});

export default HomeScreen;