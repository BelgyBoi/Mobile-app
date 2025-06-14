import React from 'react';
;import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { spacing } from '../styles/spacing'; // Add this!

export default function GlobalContainer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    backgroundColor: colors.background,
  },
});
