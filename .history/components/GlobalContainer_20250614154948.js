import React from 'react';
;import { View, StyleSheet, Dimensions } from 'react-native';
import colors from '../styles/colors.js';

const { width } = Dimensions.get('window');

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
        width: width,
        backgroundColor: colors.background,
    },
});

export default GlobalContainer;
