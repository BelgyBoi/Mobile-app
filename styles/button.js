import { StyleSheet } from 'react-native';
import colors from './colors.js';

const buttonStyles = StyleSheet.create({
    defaultButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',  
        minHeight: 56,
    },
    secondaryButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default buttonStyles;