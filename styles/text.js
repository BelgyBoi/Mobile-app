import { StyleSheet } from 'react-native';
import colors from './colors.js';

const textStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: colors.secondary,
        marginBottom: 5,
    },
    bodyText: {
        fontSize: 16,
        color: colors.secondary,
        lineHeight: 24,
    },
    buttonText: {
        fontSize: 16,
        color: colors.background,
        textAlign: 'center',
    },
});
export default textStyles;