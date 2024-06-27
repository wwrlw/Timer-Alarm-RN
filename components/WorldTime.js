import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    FlatList,
    Button,
    TouchableOpacity
} from 'react-native';

const screen = Dimensions.get('window');

// Стили для компонентов
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#07121B',
        alignItems: 'center',
        paddingTop: 20,
    },
    mainText: {
        justifyContent: 'center',
        color: '#fff',
        fontSize: 36,
        marginBottom: 20
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    cityText: {
        color: '#fff',
        fontSize: 24,
    },
    timeText: {
        paddingLeft: 10,
        color: '#fff',
        fontSize: 24,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    buttonText: {
        color: '#89AAFF',
        fontSize: 20,
    },
});

// Основной компонент приложения
const WorldTimeComponent = () => {
    const [isLoading, setLoading] = useState(true);  // Состояние для индикатора загрузки
    const [data, setData] = useState([]); // Состояние для хранения данных о времени
    const [locations, setLocations] = useState([ // Состояние для хранения списка локаций
        { area: 'Europe', location: 'Moscow' },
        { area: 'Europe', location: 'Warsaw' },
        { area: 'America', location: 'New_York' },
        { area: 'Asia', location: 'Tokyo' },
    ]);

    // Функция для получения времени из API для заданной локации
    const getTime = async (area, location) => {
        try {
            const response = await fetch(`http://worldtimeapi.org/api/timezone/${area}/${location}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    // Использование хука для получения времени при первом рендере и изменении списка локаций
    useEffect(() => {
        const fetchData = async () => {
            const results = await Promise.all(
                locations.map(loc => getTime(loc.area, loc.location)) // Установка данных, исключая ошибки
            );
            setData(results.filter(result => result !== null));
            setLoading(false); // Отключение индикатора загрузки
        };
        fetchData();
    }, [locations]);

    // Функция для форматирования времени
    const formatTime = (datetime) => {
        return datetime ? datetime.split('T')[1].split('.')[0] : '';
    };

    // Функция для добавления новой локации
    const addLocation = () => {
        setLocations([...locations, { area: 'Australia', location: 'Sydney' }]);
        setLoading(true); // Включение индикатора загрузки
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>World Time</Text>
            {isLoading ? (
                <ActivityIndicator size="large" color="#89AAFF" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.timezone}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.cityText}>{item.timezone.split('/')[1].replace('_', ' ')}</Text>
                            <Text style={styles.timeText}>{formatTime(item.datetime)}</Text>
                        </View>
                    )}
                />
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={addLocation}>
                    <Text style={styles.buttonText}>Add Sydney</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default WorldTimeComponent;