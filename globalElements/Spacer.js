// globalElements/Spacer.js
import React from 'react';
import { View } from 'react-native';
import layout from '../styles/layout';

const Spacer = ({ size = 'md', style }) => {
  // Define your heights (or you can just use a height prop directly)
  const heights = {
    sm: 8,
    md: 16,
    lg: 32,
  };
  return <View style={[{ height: heights[size] }, layout.spacer, style]} />;
};

export default Spacer;
