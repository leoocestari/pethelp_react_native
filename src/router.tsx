import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Preload from './pages/Preload/preload-index';
import Login from './pages/Login';
import Register from './pages/Register/home-index';
import { TabNavigator } from './tabroutes';
import AnimalRegister from './pages/Animals/animalRegister';
import ClinicRegister from './pages/Clinic/clinicRegister';
import ClinicIndex from './pages/Clinic/clinicIndex';

export const StackTypes = createStackNavigator();

type StackNavigation = {
  Preload: any;
  Login: any;
  Register: any;
  Tabroutes: any;
  AnimalRegister: any;
};

let navigationRef: any;

export const navigate = (name: string, params?: any) => {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(name, params);
  }
};

const AppNavigator = () => {
  navigationRef = useNavigationContainerRef<StackNavigation>();
  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <StackTypes.Navigator
        initialRouteName="Preload"
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackTypes.Screen name="Preload" component={Preload} />
        <StackTypes.Screen name="Login" component={Login} />
        <StackTypes.Screen name="Register" component={Register} />
        <StackTypes.Screen name="Tabroutes" component={TabNavigator} />
        <StackTypes.Screen name="RegisterAnimal" component={AnimalRegister} />
      </StackTypes.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;