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
        flex: 2,
        width: 380,
        maxWidth: '100%',
        backgroundColor: colors.background,
    },
});

export default GlobalContainer;