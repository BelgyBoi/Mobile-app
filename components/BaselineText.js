import React from 'react';;
import { Text, StyleSheet } from 'react-native';    
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function BaselineText({ children, style, ...props }) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.primary,
    fontSize: 16,
    marginBottom: spacing.text,
  },
}); 