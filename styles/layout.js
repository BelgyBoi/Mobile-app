import { StyleSheet } from 'react-native';
import colors from './colors.js';

const layoutStyles= StyleSheet.create({
    innerContainer: {
        backgroundColor: colors.background,
        borderRadius: 5,
        padding: 15,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default layoutStyles;

