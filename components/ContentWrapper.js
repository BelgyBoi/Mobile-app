import React from 'react';
import { View, StyleSheet } from 'react-native';
import spacing from '../styles/spacing';

export default function ContentWrapper({ children, style }) {
  return (
    <View style={[styles.wrapper, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.card,
    width: '100%',
    marginBottom: spacing.card,
  },
});
