import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdoptionList from './AdoptionList';

const Stack = createStackNavigator();

const Adoptions: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AdoptionList">
      <Stack.Screen name="AdoptionList" component={AdoptionList} options={{ title: 'Adoption List' }} />
    </Stack.Navigator>
  );
};

export default Adoptions;