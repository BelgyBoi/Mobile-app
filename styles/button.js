// styles
import { StyleSheet } from 'react-native';
import colors from './colors.js';

const buttonStyles = StyleSheet.create({
    defaultButton: {
        backgroundColor: colors.secondary,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',  
        minHeight: 39,
    },
    secondaryButton: {
        backgroundColor: colors.secondary,

        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 48,
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
    clearAllChip: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: '#f0f0f0',
      borderRadius: 15,
    },
    chip: {         
      margin: 6,                 
      backgroundColor: colors.secondary,
      borderRadius: 20,          
      flexDirection: 'row',
      alignItems: 'center',  
      justifyContent: 'space-around', 
      minWidth: '25%'   
    },

    clearAllChip: {
      paddingHorizontal: 14,
      backgroundColor: colors.secondary, 
      borderRadius: 20,
      alignSelf: 'flex-end',   
      textAlign: 'center'
    },


});
export default buttonStyles;