import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';


const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07121B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainText: {
        color: '#fff',
        fontSize: 20,
        marginVertical: 10
    },
    button: {
        borderWidth: 1,
        borderColor: '#89AAFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        padding: 10
    },
    buttonText: {
        color: '#89AAFF',
        fontSize: 20
    },
    alarmItem: {
        backgroundColor: '#333',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    alarmText: {
        color: '#fff',
        fontSize: 16
    }
});

const AlarmComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Сенин Тимфофей Денисович</Text>

            <Button title="Добавить будильник"  />
            <FlatList
                // data={alarms}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.alarmItem}>
                        <Text style={styles.alarmText}>Будильник на {item.time.toLocaleTimeString()}</Text>
                        <TouchableOpacity  style={styles.button}>
                            <Text style={styles.buttonText}>Изменить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.button}>
                            <Text style={styles.buttonText}>Удалить</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Button
                title="Перейти к таймеру"
                onPress={() => navigation.navigate('Timer')}
            />
        </View>
    );
}


export default AlarmComponent;