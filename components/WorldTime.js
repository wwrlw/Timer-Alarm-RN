import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    StatusBar,
    FlatList,
    ActivityIndicator,
} from 'react-native';


const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#07121B',
        alignItems: 'center',

    },
    mainText: {
        marginTop: 40,
        justifyContent: 'center',
        color: '#fff',
        fontSize: 48,
        marginBottom: 20
    },
    timeText: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20
    },

});


const WorldTimeComponent = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getTime = async () => {
        try {
            const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Warsaw');
            const json = await response.json();
            setData(json);
            console.log(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTime();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#89AAFF" />
            ) : (
                <View>
                    <Text style={styles.mainText}>World Time</Text>
                    <Text style={styles.timeText}>Timezone: {data.timezone}</Text>
                    <Text style={styles.timeText}>{data.datetime}</Text>
                    <Text style={styles.timeText}>{data.client_ip}</Text>
                </View>
            )}
        </View>
    );
}

export default WorldTimeComponent;