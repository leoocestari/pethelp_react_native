import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../Services/IdentityService'; // Ensure this is the correct path to your ApiService
import { Medication } from '../models/medication';

interface MedicationListProps {
  animalId: number;
}

const MedicationList: React.FC<{props: MedicationListProps}> = ({props}) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchMedications(props.animalId);
  }, []);

  const fetchMedications = async (animalId: number) => {
    try {
      const response = await api.get(`User/Medication?$filter=AnimalId eq ${animalId}`); // Adjust the endpoint as needed
      setMedications(response.data.value);
    } catch (error) {
      console.error('Error fetching medications:', error);
      Alert.alert('Error', 'Failed to fetch medications');
    }
  };

  const handleDeactivate = async (med: Medication) => {
    try {
      await api.put(`User/Medication/${med.id}`, {...med, active: false}); 
      fetchMedications(med.animalId);
    } catch (error) {
      console.error('Error deactivating medication:', error);
      Alert.alert('Error', 'Failed to deactivate medication');
    }
  };

  const handleAddMedication = () => {
    navigation.navigate('MedicationRegister'); // Adjust based on your navigation setup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medications</Text>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>Description: {item.description}</Text>
            <Text style={styles.cardText}>Dose: {item.dose} {item.doseUnitOfMeasurement}</Text>
            <Text style={styles.cardText}>Frequency: {item.frequency}</Text>
            <Text style={styles.cardText}>Duration: {item.duration}</Text>
            <Text style={styles.cardText}>Notes: {item.notes}</Text>
            <Text style={styles.cardText}>Active: {item.active ? 'Yes' : 'No'}</Text>
            <Button title="Deactivate" onPress={() => handleDeactivate(item)} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
        <Text style={styles.addButtonText}>Add Medication</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MedicationList;