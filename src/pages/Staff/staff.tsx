import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StaffPage from './StaffPage';
import AdoptionApproval from './AdoptionApproval';
import AdoptionDetails from './AdoptionDetail';

const Stack = createStackNavigator();

const StaffNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="StaffPage">
      <Stack.Screen name="StaffPage" component={StaffPage} options={{ title: 'Staff Page' }} />
      <Stack.Screen name="AdoptionApproval" component={AdoptionApproval} options={{ title: 'Adoption Approval' }} />
      <Stack.Screen name="AdoptionDetails" component={AdoptionDetails} options={{ title: 'Adoption Detail' }} />
    </Stack.Navigator>
  );
};

export default StaffNavigator;