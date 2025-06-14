import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors.js';

const ComponentContainer = ({ children }) => {
    return (
        <View style={styles.cc}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    cc: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.background,
        borderRadius: 5,
        paddingHorizontal: 16,
        marginVertical: 10,
    },
});

export default ComponentContainer;
