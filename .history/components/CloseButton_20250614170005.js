// src/components/CloseButton.js
import React from 'react';
;import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import buttonStyles from '../styles/button.js';
import colors from '../styles/colors.js';
import layoutStyles from '../styles/layout.js';

export default function CloseButton({
  onPress,
  size = 24,               
  color = colors.secondary,   
  style,                    
  iconStyle,                 
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ buttonStyles.iconButton, style ]}
    >
      <Ionicons
        name="close"
        size={size}
        color={color}
        style={iconStyle || layoutStyles.closeIcon}
      />
    </TouchableOpacity>
  );
}
