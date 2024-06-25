import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    StatusBar,
    Platform,
} from 'react-native';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07121B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainText: {
        justifyContent: 'center',
        color: '#fff',
        fontSize: 24,
        marginBottom: 20
    },
    timeText: {
        color: '#fff',
        fontSize: 48,
        marginBottom: 20
    },
    picker: {
        height: 50,
        width: screen.width / 2,
        color: '#fff',
        ...Platform.select({
            android: {
                backgroundColor: 'rgba(92, 92, 92, 0.206)',
            }
        })
    },
    pickerItem: {
        color: '#fff',
        fontSize: 20,
        ...Platform.select({
            android: {
                marginLeft: 10,
                marginRight: 10,
            }
        })
    }
});


const WorldTimeComponent = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <Text style={styles.mainText}>World Clock</Text>
            <Text style={styles.timeText}>currentTime</Text>

        </View>
    );
}

export default WorldTimeComponent;