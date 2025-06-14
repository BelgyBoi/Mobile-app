// styles
import { StyleSheet } from 'react-native';
import colors from './colors.js';

const textStyles = StyleSheet.create({
    homeNav: {
        fontSize: 18,
        color: colors.primary,
        fontFamily: 'SpaceGrotesk_700Bold',
        alignContent: 'center',
        alignItems: 'center',
    },
    highlight: {
        fontSize: 18,
        color: colors.secondary,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.background,
    },
    placeholderText: {
        backgroundColor: colors.ghosted, // A light gray for placeholder
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipText: {
        fontSize: 14,
        color: colors.background,
        textAlign: 'center',
    },
    centerAlign: {
        textAlign: 'center',
    },
    price: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: 'bold',
    },
    metaText: {
        fontSize: 12,
    },
    productTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    
    productPrice: {
      fontSize: 18,
      color: colors.primary,
      textAlign: 'center',
      marginBottom: 10,
    },
    
    productDescription: {
      fontSize: 16,
      color: colors.darkGray,
      textAlign: 'center',
      marginHorizontal: 20,
    },
    modalTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    selectedFiltersTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#555',
    },
    clearAllChipButtonText: {
      fontSize: 12,
      color: colors.background,
    },
    dropdownItemSelectedText: {
      fontWeight: 'bold',
      color: '#007bff',
    },
    dropdownItemSelectedText: {
    fontWeight: 'bold',
    color: colors.background,
    },
    filterChipRemove: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.background,
    },
    quantityText: {
      fontSize: 20,
      color: colors.primary,
      textAlign: 'center',
      marginVertical: 10,
      fontFamily: 'SpaceGrotesk_500Medium',
    },

});
export default textStyles;