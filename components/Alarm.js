import React, { useState, useReducer } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

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
// Функциональный компонент для работы с будильниками
const AlarmComponent = () => {
    // Хук навигации, предоставляющий методы для перехода между экранами
    const navigation = useNavigation();
    // Состояние для хранения списка будильников
    const [alarms, setAlarms] = useState([]);
    // Состояние для хранения текущего будильника (редактирование или добавление нового)
    const [currentAlarm, setCurrentAlarm] = useState({});
    // Состояние для отображения или скрытия выбора времени с использованием DateTimePicker
    const [showPicker, setShowPicker] = useState(false);

    // Функция для добавления или обновления будильника в списке
    const addOrUpdateAlarm = (selectedDate) => {
        // Создаем новый объект будильника с уникальным идентификатором (или текущим временем) и выбранной датой (или текущим временем)
        const newAlarm = { id: currentAlarm.id || Date.now(), time: selectedDate || new Date() };
        // Обновляем состояние списка будильников, используя функцию обратного вызова в setAlarms
        setAlarms(prev => {
            const index = prev.findIndex(a => a.id === newAlarm.id);
            if (index > -1) {
                return [...prev.slice(0, index), newAlarm, ...prev.slice(index + 1)];
            }
            return [...prev, newAlarm];
        });
        // Сбрасываем текущий будильник в пустой объект
        setCurrentAlarm({});
        // Скрываем DateTimePicker
        setShowPicker(false);
    };

    // Функция для удаления будильника по ID
    const deleteAlarm = (id) => {
        setAlarms(alarms.filter(alarm => alarm.id !== id));
    };
    // Функция для редактирования будильника
    const editAlarm = (alarm) => {
        setCurrentAlarm(alarm);
        setShowPicker(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Сенин Тимфофей Денисович</Text>
            {showPicker && (
                <DateTimePicker
                    value={currentAlarm.time || new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => addOrUpdateAlarm(selectedDate)}
                />
            )}
            <Button title="Добавить будильник" onPress={() => setShowPicker(true)} />
            <FlatList
                data={alarms}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.alarmItem}>
                        <Text style={styles.alarmText}>Будильник на {item.time.toLocaleTimeString()}</Text>
                        <TouchableOpacity onPress={() => editAlarm(item)} style={styles.button}>
                            <Text style={styles.buttonText}>Изменить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteAlarm(item.id)} style={styles.button}>
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
};

export default AlarmComponent;