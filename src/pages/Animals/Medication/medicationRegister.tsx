import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../Services/IdentityService'; // Ensure this is the correct path to your ApiService

const MedicationRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dose, setDose] = useState('');
  const [doseUnitOfMeasurement, setDoseUnitOfMeasurement] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [clinicId, setClinicId] = useState('');
  const [animalId, setAnimalId] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !description || !dose || !doseUnitOfMeasurement || !frequency || !duration || !clinicId || !animalId) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const medicationData = {
      name,
      description,
      dose: parseInt(dose),
      doseUnitOfMeasurement,
      frequency,
      duration,
      notes,
      active: true,
      clinicId: parseInt(clinicId),
      animalId: parseInt(animalId),
    };

    try {
      const response = await api.post('/odata/Medication', medicationData); // Adjust the endpoint as needed

      if (response.status === 201) {
        Alert.alert('Success', 'Medication registered successfully!');
        navigation.goBack();
      } else {
        const errorData = await response.data;
        Alert.alert('Error', errorData.message || 'Failed to register medication');
      }
    } catch (error) {
      Alert.alert('Error', (error as any).message || 'Failed to register medication');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register a New Medication</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Dose"
        value={dose}
        onChangeText={setDose}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Dose Unit of Measurement"
        value={doseUnitOfMeasurement}
        onChangeText={setDoseUnitOfMeasurement}
      />
      <TextInput
        style={styles.input}
        placeholder="Frequency"
        value={frequency}
        onChangeText={setFrequency}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />
      <TextInput
        style={styles.input}
        placeholder="Clinic ID"
        value={clinicId}
        onChangeText={setClinicId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Animal ID"
        value={animalId}
        onChangeText={setAnimalId}
        keyboardType="numeric"
      />
      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default MedicationRegister;