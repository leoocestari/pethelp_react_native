import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import UserContextProvider from './src/contexts/UserContext';
import Routes from './src/router';
import Tabroutes from './src/tabroutes';

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#000" translucent={true} />
        <Routes />
        {/*<Tabroutes />*/}
      </NavigationContainer>
    </UserContextProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});