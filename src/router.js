import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './pages/home';
import Detail from './pages/detail';

const Stack = createStackNavigator();

function Routes(){
  return(
    <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown:false
    }}
    >
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SignIn" component={Login} />
      <Stack.Screen name="SignUp" component={Register} />
    </Stack.Navigator>
  )
}

export default Routes;