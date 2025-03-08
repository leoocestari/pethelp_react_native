import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../Services/IdentityService'; // Ensure this is the correct path to your ApiService

const VaccineRegister: React.FC = () => {
  const [type, setType] = useState('');
  const [dateTaken, setDateTaken] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [clinicId, setClinicId] = useState('');
  const [animalId, setAnimalId] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!type || !dateTaken || !nextDate || !clinicId || !animalId) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const vaccineData = {
      type,
      dateTaken,
      nextDate,
      clinicId: parseInt(clinicId),
      animalId: parseInt(animalId),
    };

    try {
      const response = await api.post('/odata/Vaccine', vaccineData); // Adjust the endpoint as needed

      if (response.status === 201) {
        Alert.alert('Success', 'Vaccine registered successfully!');
        navigation.goBack();
      } else {
        const errorData = await response.data;
        Alert.alert('Error', errorData.message || 'Failed to register vaccine');
      }
    } catch (error) {
      Alert.alert('Error', (error as any).message || 'Failed to register vaccine');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register a New Vaccine</Text>
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Date Taken"
        value={dateTaken}
        onChangeText={setDateTaken}
      />
      <TextInput
        style={styles.input}
        placeholder="Next Date"
        value={nextDate}
        onChangeText={setNextDate}
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

export default VaccineRegister;