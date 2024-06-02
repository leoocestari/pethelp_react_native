import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Header from '../../components/header'

export default function Home() {
  return (
    <View style={styles.container}>
      {/*<Header name="Lucas Silva" />*/}
      <Text>homepage</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:32,
    flex: 1,
    backgroundColor: '#fff',
  },
});
