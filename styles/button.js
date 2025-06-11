import { StyleSheet } from 'react-native';
import colors from './colors.js';

const buttonStyles = StyleSheet.create({
    primaryButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.background,
        fontSize: 16,
    },
});
export default buttonStyles;