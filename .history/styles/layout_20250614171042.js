// styles
import { StyleSheet } from 'react-native';
import colors from './colors.js';
import { BlurView } from 'expo-blur';   
import { FullWindowOverlay, SearchBar } from 'react-native-screens';

const layoutStyles= StyleSheet.create({
    outer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacer: {
        height: 20,
    },
    FullWindowOverlay: {
        backgroundColor: colors.background,
        padding: 10,
        borderRadius: 10,
        height: '95%',
        width: '95%',
    },
    closeIcon: {
        padding: 5,
        borderRadius: 15,
    },
    SearchBar: {
        backgroundColor: colors.background,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.ghosted,
        width: '85%',
        alignItems: 'center',
        maxHeight: 44,
        justifyContent: 'space-between',
        borderRadius: 5,
         dropShadow: {
            shadowColor: colors.shadow,
            shadowOffset: { 
                width: 0, 
                height: 2 
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    card: {
        marginBottom: 20,
    },
    scrollContainer: {
      paddingBottom: 40,
    },

    imageContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },

    productImage: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
      borderRadius: 10,
    },
});
export default layoutStyles;

