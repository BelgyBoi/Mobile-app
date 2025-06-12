// src/components/HeaderBar.js

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';

export default function HeaderBar({ showBack, title, showLogo }) {
  const navigation = useNavigation();
  const logo = require('../assets/Volkswagen_group_logo.png');
  const insets = useSafeAreaInsets(); // Correctly get insets object

  return (
    <View style={styles.container}>
        <SafeAreaView
            edges={['top']}
            style={[{ paddingTop: insets.top, backgroundColor: colors.background }]}> 
              {showBack ? (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text style={styles.backText}>return home</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.spacer} /> 
              )}

              {showLogo ? (
                <View style={styles.logoContainer}>
                  <Image
                    source={logo}
                    style={styles.logo}
                  />
                </View>
              ) : (
                <Text style={styles.title}>{title}</Text>
              )}

              <View style={styles.spacer} /> // Right spacer for balance
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center children
    justifyContent: 'center', // Space out children
    elevation: 4,
    backgroundColor: colors.background, // Ensure container has bg color
  },
  backButton: {
    width: 88, // Defined width for consistent spacing
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8, // Keep padding for touch area
  },
  backText: {
    fontFamily: 'SpaceGrotesk_Regular400',
    fontSize: 16,
    color: colors.secondary, // Added text color
  },
  title: {
    flex: 1, // Take available space
    textAlign: 'center', // Center text horizontally
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: colors.secondary, // Added text color
  },
  logoContainer: {
    flex: 1, // Take available space
    justifyContent: 'center',
  },
  logo: {
    width: '100%', 
    resizeMode: 'contain',
  },
  spacer: {
    width: 88, // Defined width, same as backButton for balance
  },
});
