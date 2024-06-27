import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import TimerComponent from '../components/Timer';
import AlarmComponent from '../components/Alarm';

test('Navigation between TimerComponent and AlarmComponent works correctly', () => {
    const { getByText } = render(
        <NavigationContainer>
            <TimerComponent />
            <AlarmComponent />
        </NavigationContainer>
    );

    fireEvent.press(getByText('Add Alarm'));
    expect(getByText('Выберите время для будильника')).toBeTruthy();
});