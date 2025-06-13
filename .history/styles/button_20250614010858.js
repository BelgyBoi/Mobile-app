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
        minHeight: 44,
    },
    secondaryButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chip: {
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5, // backward compatibility if gap is not supported
        marginBottom: 5, // backward compatibility if gap is not supported
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        borderRadius: 15,
    },
    backButton: {
      marginBottom: 10,
      paddingHorizontal: 15,
      paddingVertical: 8,
      alignSelf: 'flex-start',
    },

    backButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
});
export default buttonStyles;