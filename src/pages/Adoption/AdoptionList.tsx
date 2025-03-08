import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { api } from '../../Services/IdentityService'; // Ensure this is the correct path to your ApiService
import { useAdoptionList } from '../../contexts/AdoptionListContext';

const AdoptionList: React.FC = () => {
  const [adoptions, setAdoptions] = useState<any[]>([]);
  const { removeFromList, clearList } = useAdoptionList();

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const fetchAdoptions = async () => {
    try {
      const response = await api.get('/user/watched'); // Fetch data from /user/watched
      setAdoptions(response.data.value);
    } catch (error) {
      console.error('Error fetching adoptions:', error);
      Alert.alert('Error', 'Failed to fetch adoptions');
    }
  };

  const handleRemoveAnimal = async (animalId: string) => {
    try {
      await api.put(`/watched/remove?key=${animalId}`); // Use the /watched/remove endpoint
      removeFromList(animalId);
      fetchAdoptions();
    } catch (error) {
      Alert.alert('Error', 'Failed to remove animal from adoption list');
    }
  };

  const handleSubmitAdoptionRequest = async () => {
    if (adoptions.length === 0) {
      Alert.alert('Error', 'Please add at least one animal');
      return;
    }

    const adoptionRequest = {
      userId: 1, // Replace with the actual user ID
      adoptionDetails: adoptions.map(animal => ({
        animalId: animal.Id,
        observation: '',
      })),
    };

    try {
      const response = await api.post('/Adoption/Create', adoptionRequest);

      if (response.status === 200) {
        Alert.alert('Success', 'Adoption request submitted successfully!');
        clearList();
        fetchAdoptions();
      } else {
        const errorData = await response.data;
        Alert.alert('Error', errorData.message || 'Failed to submit adoption request');
      }
    } catch (error) {
      Alert.alert('Error', (error as any).message || 'Failed to submit adoption request');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adoption List</Text>
      <FlatList
        data={adoptions}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <View style={styles.animalCard}>
            <Text style={styles.animalText}>Name: {item.Name}</Text>
            <Text style={styles.animalText}>Species: {item.Species}</Text>
            <Text style={styles.animalText}>Breed: {item.Breed}</Text>
            <Text style={styles.animalText}>Color: {item.Color}</Text>
            <Text style={styles.animalText}>Gender: {item.Gender}</Text>
            <Text style={styles.animalText}>Temperament: {item.Temperament}</Text>
            <Button title="Remove" onPress={() => handleRemoveAnimal(item.Id.toString())} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <Button title="Submit Adoption Request" onPress={handleSubmitAdoptionRequest} />
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
  animalCard: {
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
  animalText: {
    fontSize: 14,
    color: '#666',
  },
});

export default AdoptionList;