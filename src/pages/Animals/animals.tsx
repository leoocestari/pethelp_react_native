import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnimalList from './animalList';
import AnimalRegister from './animalRegister';
import AnimalInfo from './animalInfo';

const Stack = createStackNavigator();

const Animals
: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AnimalList">
      <Stack.Screen name="AnimalList" component={AnimalList} options={{ title: 'Animals' }} />
      <Stack.Screen name="AnimalRegister" component={AnimalRegister} options={{ title: 'Register Animal' }} />
      <Stack.Screen name="AnimalInfo" component={AnimalInfo} options={{ title: 'Animal Info' }} />
    </Stack.Navigator>
  );
};

export default Animals;