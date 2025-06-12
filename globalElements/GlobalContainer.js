import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors.js';

const GlobalContainer = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.background,
        paddingTop: 15,
    },
});

export default GlobalContainer;