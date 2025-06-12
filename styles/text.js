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
        marginBottom: 10,
    },
    highlight: {
        fontSize: 18,
        color: colors.secondary,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 5,
    },
    bodyText: {
        fontSize: 14,
        lineHeight: 24,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.background,
    },
    chipText: {
        fontSize: 14,
        color: colors.background,
        textAlign: 'center',
    },
});
export default textStyles;