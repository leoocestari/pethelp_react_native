import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../Services/IdentityService'; // Ensure this is the correct path to your ApiService
import { Vaccine } from '../models/Vaccine';


const VaccineList: React.FC = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      const response = await api.get('odata/Vaccine'); // Adjust the endpoint as needed
      setVaccines(response.data.value);
    } catch (error) {
      console.error('Error fetching vaccines:', error);
      Alert.alert('Error', 'Failed to fetch vaccines');
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      await api.put(`odata/Vaccine/${id}`, { active: false }); // Adjust the endpoint as needed
      fetchVaccines();
    } catch (error) {
      console.error('Error deactivating vaccine:', error);
      Alert.alert('Error', 'Failed to deactivate vaccine');
    }
  };

  const handleAddVaccine = () => {
    navigation.navigate('VaccineRegister'); // Adjust based on your navigation setup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vaccines</Text>
      <FlatList
        data={vaccines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.type}</Text>
            <Text style={styles.cardText}>Date Taken: {item.dateTaken}</Text>
            <Text style={styles.cardText}>Next Date: {item.nextDate}</Text>
            <Button title="Deactivate" onPress={() => handleDeactivate(item.id)} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddVaccine}>
        <Text style={styles.addButtonText}>Add Vaccine</Text>
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

export default VaccineList;