import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Preload from './pages/Preload';
import Login from './pages/Login';
import Register from './pages/Register';
import Tabroutes from './tabroutes';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';



const Stack = createStackNavigator();

type StackNavigation = {
  Preload: undefined;
  Login: undefined;
  Register: undefined;
  Tabroutes: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default () => {
  return(
    <Stack.Navigator
    initialRouteName='Preload'
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Tabroutes" component={Tabroutes} />
    </Stack.Navigator>
  );
}

