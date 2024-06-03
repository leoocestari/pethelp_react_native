import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Preload from './pages/Preload';
import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/home';
import Detail from './pages/detail';

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
}

