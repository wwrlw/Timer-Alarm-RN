import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Platform,
    Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Audio} from "expo-av";

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07121B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainText: {
        justifyContent: 'center',
        color: '#fff'
    },
    button: {
        borderWidth: 10,
        borderColor: '#89AAFF',
        width: screen.width / 2,
        height: screen.width / 2,
        borderRadius: screen.width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    buttonStop: {
        borderColor: '#FF851B'
    },
    buttonText: {
        fontSize: 45,
        color: '#89AAFF'
    },
    buttonTextStop: {
        color: '#FF851B'
    },
    timerText: {
        color: '#fff',
        fontSize: 90
    },
    picker: {
        flex: 1,
        maxWidth: 100,
        ...Platform.select({
            android: {
                color: '#fff',
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
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

function TimerComponent() {
    const [remainingSeconds, setRemainingSeconds] = useState(5);
    // Создает состояние для отслеживания оставшихся секунд таймера. Изначально установлено в 5 секунд.
    const [isRunning, setIsRunning] = useState(false);
    // Создает состояние для отслеживания, запущен ли таймер. Изначально таймер не запущен.
    const [selectedMinutes, setSelectedMinutes] = useState('0');
    // Создает состояние для отслеживания выбранных минут. Изначально установлено в '0'.
    const [selectedSeconds, setSelectedSeconds] = useState('5');
    // Создает состояние для отслеживания выбранных секунд. Изначально установлено в '5'.
    const [sound, setSound] = useState();
    const navigation = useNavigation();



    useEffect(() => {
        // useEffect обрабатывает логику таймера.
        let interval;
        // Если таймер запущен, создает интервал, который уменьшает remainingSeconds каждую секунду.
        if (isRunning) {
            interval = setInterval(() => {
                setRemainingSeconds(prev => prev - 1);
            }, 1000);
        }
        // Останавливает таймер, если время истекло.
        if (remainingSeconds === 0 && isRunning) {
            playSound();
            clearInterval(interval);
            setIsRunning(false);
        }
        // Очищает интервал при размонтировании компонента или изменении зависимостей.
        return () => clearInterval(interval);
    }, [isRunning, remainingSeconds]);

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../assets/tone/iphone-ringtone-sound-effect.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // Запускает таймер с выбранным временем.
    const start = useCallback(() => {
        setRemainingSeconds(
            parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10)
        );
        setIsRunning(true);
    }, [selectedMinutes, selectedSeconds]);

    // Останавливает таймер.
    const stop = useCallback(() => {
        setIsRunning(false);
    }, []);

    // Функция для отрисовки выбора минут и секунд в виде выпадающих списков.
    const renderPickers = () => {
        const AVAILABLE_MINUTES = createArray(10);
        const AVAILABLE_SECONDS = createArray(60);

        return (

            <View style={styles.pickerContainer}>

                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedMinutes}
                    onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
                    mode='dropdown'
                >
                    {AVAILABLE_MINUTES.map((value) => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))}
                </Picker>
                <Text style={styles.pickerItem}>minutes</Text>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedSeconds}
                    onValueChange={(itemValue) => setSelectedSeconds(itemValue)}
                    mode='dropdown'
                >
                    {AVAILABLE_SECONDS.map((value) => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))}
                </Picker>
                <Text style={styles.pickerItem}>seconds</Text>

            </View>
        );
    };


    // Функция форматирования числа, добавляет ведущий ноль, если число меньше 10.
    const formatNumber = (number) => `0${number}`.slice(-2);

    // Функция, вычисляющая оставшееся время в минутах и секундах на основе переданного времени в секундах.
    const getRemaining = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
    };

// Функция, создающая массив чисел от 0 до заданной длины в виде строк.
    const createArray = (length) => {
        return Array.from({ length }, (_, i) => i.toString());
    };
// Получение отформатированных минут и секунд на основе оставшегося времени таймера.
    const { minutes, seconds } = getRemaining(remainingSeconds);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            {isRunning ? (
                <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
            ) : (
                renderPickers()
            )}
            {isRunning ? (
                <TouchableOpacity onPress={stop} style={[styles.button, styles.buttonStop]}>
                    <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={start} style={styles.button}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default TimerComponent;