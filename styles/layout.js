import { StyleSheet } from 'react-native';
import colors from './colors.js';
import { BlurView } from 'expo-blur';   
import { FullWindowOverlay } from 'react-native-screens';

const layoutStyles= StyleSheet.create({
    innerContainer: {
        backgroundColor: colors.background,
        borderRadius: 5,
        padding: 30,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-around',
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

});
export default layoutStyles;

