import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors.js';

const ViewPort = ({ children }) => {
    return (
        <View style={styles.outer}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: colors.background,
        paddingTop: 15,
    },
});

export default ViewPort;