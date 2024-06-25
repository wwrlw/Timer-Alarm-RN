import React, { useState } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07121B',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
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
        padding: 10,
        flexDirection: 'row'
    },
    buttonText: {
        color: '#89AAFF',
        fontSize: 20
    },
    alarmItem: {
        backgroundColor: '#333',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: screen.width - 40,
        alignSelf: 'center',
    },
    alarmText: {
        color: '#fff',
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10
    },
    iconButton: {
        marginHorizontal: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#89AAFF',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 18
    }
});

const AlarmComponent = () => {
    const navigation = useNavigation();
    // Хук для навигации между экранами
    const [alarms, setAlarms] = useState([]);
    // Состояние для хранения списка будильников
    const [currentAlarm, setCurrentAlarm] = useState({});
    // Состояние для текущего редактируемого будильника
    const [showModal, setShowModal] = useState(false);
    // Состояние для управления отображением модального окна
    const [selectedDate, setSelectedDate] = useState(new Date());
    // Состояние для выбранной даты и времени будильника

    // Функция для добавления или обновления будильника
    const addOrUpdateAlarm = () => {
        const newAlarm = { id: currentAlarm.id || Date.now(), time: selectedDate || new Date() };
        // Создаем новый будильник с уникальным id (если это новый будильник) и выбранным временем
        setAlarms(prev => {
            const index = prev.findIndex(a => a.id === newAlarm.id);
            // Проверяем, существует ли уже будильник с таким id
            if (index > -1) {
                // Если существует, обновляем его
                return [...prev.slice(0, index), newAlarm, ...prev.slice(index + 1)];
            }
            // Если не существует, добавляем его в список
            return [...prev, newAlarm];
        });
        setCurrentAlarm({});
        // Очищаем текущий будильник
        setShowModal(false);
        // Закрываем модальное окно
    };


    // Функция для удаления будильника по id
    const deleteAlarm = (id) => {
        setAlarms(alarms.filter(alarm => alarm.id !== id));
    };

    // Функция для редактирования будильника
    const editAlarm = (alarm) => {
        setCurrentAlarm(alarm);
        // Устанавливаем редактируемый будильник
        setSelectedDate(new Date(alarm.time));
        // Устанавливаем дату и время редактируемого будильника
        setShowModal(true);
        // Открываем модальное окно
    };


    // Функция для обработки изменения даты и времени
    const handleDateChange = (event, date) => {
        if (date) {
            setSelectedDate(date); // Устанавливаем выбранную дату и время
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Сенин Тимфофей Денисович</Text>
            <Button title="Добавить будильник" onPress={() => setShowModal(true)} />
            <FlatList
                data={alarms}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.alarmItem}>
                        <Text style={styles.alarmText}>{item.time.toLocaleTimeString()}</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                marginBottom: 10,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => editAlarm(item)} style={styles.iconButton}>
                                <Icon name="edit" size={20} color="#89AAFF" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteAlarm(item.id)} style={styles.iconButton}>
                                <Icon name="trash" size={20} color="#89AAFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ paddingVertical: 10 }}
                style={{ width: '100%' }}
            />
            <Modal
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Выберите время для будильника</Text>
                        <DateTimePicker
                            value={selectedDate}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChange}
                        />
                        <TouchableOpacity onPress={addOrUpdateAlarm} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Сохранить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={[styles.modalButton, { backgroundColor: '#FF6666' }]}>
                            <Text style={styles.modalButtonText}>Отмена</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AlarmComponent;