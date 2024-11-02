import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import UserContextProvider from './src/contexts/UserContext';
import Routes from './src/router';
import { AdoptionListProvider } from './src/contexts/AdoptionListContext';


export default function App() {
  return (
    <AdoptionListProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AdoptionListProvider>
  );
}

