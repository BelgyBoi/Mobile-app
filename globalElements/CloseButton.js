// src/components/CloseButton.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../styles/button.js';
import colors from '../styles/colors.js';

export default function CloseButton({
  onPress,
  size = 24,               
  color = colors.primary,   
  style,                    
  iconStyle,                 
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ globalStyles.iconButton, style ]}
    >
      <Ionicons
        name="close"
        size={size}
        color={color}
        style={iconStyle || globalStyles.closeIcon}
      />
    </TouchableOpacity>
  );
}
