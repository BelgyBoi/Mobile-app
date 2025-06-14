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
        flexDirection: 'column',
        backgroundColor: colors.background,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
        width: '100%',
        maxWidth: 375,
        alignSelf: 'center',
        marginVertical: 10,
    },
});

export default ComponentContainer;