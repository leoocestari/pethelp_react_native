import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnimalList from './animalList';
import AnimalRegister from './animalRegister';
import AnimalInfo from './animalInfo';
import AdoptionList from '../Adoption/AdoptionList';
import MedicationList from './Medication/medicationList';
import MedicationRegister from './Medication/medicationRegister';
import VaccineList from './Vaccine/VaccineList';
import VaccineRegister from './Vaccine/VaccineRegister';
import { Medication } from './models/medication';
import { Animal } from './models/animalModel';

const Stack = createStackNavigator();

const Animals
: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AnimalList">
      <Stack.Screen name="AnimalList" component={AnimalList} options={{ title: 'Animals' }} />
      <Stack.Screen name="AnimalInfo" component={AnimalInfo} options={{ title: 'Animal Info' }} />
      <Stack.Screen name="AnimalRegister" component={AnimalRegister} options={{ title: 'Animal Register' }} />
      <Stack.Screen name="MedicationList" options={{ title: 'Medications' }}>
        {props => <MedicationList {...props.route.params as any} />}
      </Stack.Screen>
      <Stack.Screen name="MedicationRegister" component={MedicationRegister} options={{ title: 'Register Medication' }} />
      <Stack.Screen name="VaccineList" component={VaccineList} options={{ title: 'Vaccines' }} />
      <Stack.Screen name="VaccineRegister" component={VaccineRegister} options={{ title: 'Register Vaccine' }} />
    </Stack.Navigator>
  );
};

export default Animals;