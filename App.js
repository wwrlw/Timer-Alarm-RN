import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AlarmComponent from './components/Alarm';
import TimerComponent from './components/Timer';
import WorldTimeComponent from "./components/WorldTime";
import styles from './styles/styles';
const Tab = createBottomTabNavigator();

function App() {
    return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === 'Alarm') {
                                iconName = focused ? 'alarm' : 'alarm-outline';
                            } else if (route.name === 'Timer') {
                                iconName = focused ? 'timer' : 'timer-outline';
                            } else if (route.name === 'WorldTime') {
                                iconName = focused ? 'globe' : 'globe-outline';
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#89AAFF',
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: [
                            {
                                display: 'flex',
                            },
                            null,
                        ],
                        headerShown: false, // скрываем верхнюю полоску
                    })}
                >
                    <Tab.Screen name="Alarm" component={AlarmComponent} />
                    <Tab.Screen name="Timer" component={TimerComponent} />
                    <Tab.Screen name="WorldTime" component={WorldTimeComponent} />
                </Tab.Navigator>
            </NavigationContainer>
    );
}

export default App;