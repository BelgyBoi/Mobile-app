// styles
import { StyleSheet } from 'react-native';
import colors from './colors.js';

const textStyles = StyleSheet.create({

    defaultText: {
        fontFamily: 'SpaceGrotesk_400Regular',
        color: colors.primary,
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    highlight: {
        fontSize: 18,
        color: colors.secondary,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,    },
    bodyText: {
        fontSize: 14,
        lineHeight: 24,
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

});
export default textStyles;