import React from 'react';;
import { Text, StyleSheet } from 'react-native';    
import colors from '../styles/colors';

export default function BaselineText({ children, style, ...props }) {
  return (
    <BaselineText style={[styles.text, style]} {...props}>
      {children}
    </BaselineText>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.primary,
    fontSize: 16,
  },
}); 