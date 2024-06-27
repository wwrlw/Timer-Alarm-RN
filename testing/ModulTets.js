import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TimerComponent from '../components/Timer';

test('TimerComponent starts countdown correctly', () => {
    const { getByText } = render(<TimerComponent />);
    fireEvent.press(getByText('Start'));
    expect(getByText('00:05')).toBeTruthy();
});