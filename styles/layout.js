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
        borderColor: '#ACACAC',
        width: '85%',
        alignItems: 'center',
        maxHeight: 44,
        justifyContent: 'space-between',
        borderRadius: 5,
    },

});
export default layoutStyles;

