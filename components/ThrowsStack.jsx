import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateThrowScreen from './CreateThrow';
import ThrowsScreen from './ThrowsScreen';
import ThrowsScreen2 from './ThrowsScreen2';

const Stack = createNativeStackNavigator();

const ThrowsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Throws"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ThrowsScreen" component={ThrowsScreen} />
      <Stack.Screen name="ThrowsScreen2" component={ThrowsScreen2} />
      <Stack.Screen name="CreateThrow" component={CreateThrowScreen} />
    </Stack.Navigator>
  );
};

export default ThrowsStack;
