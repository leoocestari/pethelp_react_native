import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClinicRegister from './clinicRegister';
import ClinicIndex from './clinicIndex';

const Stack = createStackNavigator();

const Clinics: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ClinicList">
      <Stack.Screen name="ClinicList" component={ClinicIndex} options={{ title: 'Clinics' }} />
      <Stack.Screen name="ClinicRegister" component={ClinicRegister} options={{ title: 'Register Clinic' }} />
      {/* <Stack.Screen name="ClinicMaintenance" component={ClinicMaintenance} options={{ title: 'Clinic Maintenance' }} /> */}
    </Stack.Navigator>
  );
};

export default Clinics;