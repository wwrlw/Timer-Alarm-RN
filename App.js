import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AlarmComponent from './components/Alarm';
// import TimerComponent from './components/Timer';

const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Alarm" component={AlarmComponent} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;