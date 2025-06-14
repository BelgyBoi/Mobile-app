// navheader
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import BaselineText from './BaselineText.js';

const MAX_HEADER_HEIGHT = 80;
const CONTENT_HEIGHT = 56;
const PADDING_VERTICAL = 5;
const USABLE_CONTENT_HEIGHT = CONTENT_HEIGHT - (2 * PADDING_VERTICAL);
const safeTopPadding = Math.max(0, MAX_HEADER_HEIGHT - CONTENT_HEIGHT);

export default function HeaderBar({ showBack, title, showLogo }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const paddingTop = Math.min(insets.top, safeTopPadding);

  const isHomeScreenLogoOnly = showLogo && !showBack;

  // Conditional styles
  const headerContainerStyle = [
    styles.headerContentContainer,
    isHomeScreenLogoOnly && { justifyContent: 'center' }
  ];

  const leftContainerStyle = [
    styles.leftContainer,
    isHomeScreenLogoOnly && { flex: null } // Remove flex: 1 to allow centering
  ];

  const spacerStyle = [
    styles.spacer,
    isHomeScreenLogoOnly && { width: 0 } // Make spacer take no space on home screen
  ];

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        backgroundColor: colors.background, 
        paddingTop: paddingTop,
        elevation: 3,
        shadowColor: colors.shadow, 
        shadowOffset: { 
          width: 0, 
          height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
      }} 
    >
      <View style={headerContainerStyle}> 
        {/* Left side: Logo or Title */}
        <View style={leftContainerStyle}>
          {showLogo ? (
            <Image
              source={require('../assets/Volkswagen_group_logo.png')}
              style={styles.logoImage}
            />
          ) : (
            <BaselineText style={styles.titleText}>{title}</BaselineText>
          )}
        </View>

        {/* Right side: Back Button or  */}
        {/* Conditionally render RightContainer or adjust its style if truly nothing should be there */}
        {/* For now, the spacer inside will just become 0-width */}
        {!isHomeScreenLogoOnly || showBack ? ( // Render right container if not home screen logo only, or if back button needs to be shown
          <View style={styles.rightContainer}>
            {showBack ? (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')}
              >
                <BaselineText style={styles.backButtonText}>Return Home</BaselineText>
              </TouchableOpacity>
            ) : (
              //  is only rendered if not home screen logo only AND no back button
              !showLogo && <View style={spacerStyle} /> 
            )}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContentContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background, 
    paddingHorizontal: 15,
    height: CONTENT_HEIGHT,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    paddingVertical: PADDING_VERTICAL,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    paddingVertical: PADDING_VERTICAL, 
  },
  logoImage: {
    height: USABLE_CONTENT_HEIGHT, 
    aspectRatio: 120 / 30, 
    resizeMode: 'cover',
  },
  titleText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: Math.min(18, USABLE_CONTENT_HEIGHT * 0.7),
    color: colors.secondary,
    lineHeight: Math.min(22, USABLE_CONTENT_HEIGHT),
  },
  backButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: '100%',
  },
  backButtonText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: Math.min(16, USABLE_CONTENT_HEIGHT * 0.6),
    color: colors.secondary,
    lineHeight: Math.min(20, USABLE_CONTENT_HEIGHT),
  },
  spacer: {
    width: 88, // Default width, will be overridden by spacerStyle if needed
  },
});
