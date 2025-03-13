import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormScreen from './Lab13/screens/FormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Form" 
          component={FormScreen}
          options={{ title: 'Form Example' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}