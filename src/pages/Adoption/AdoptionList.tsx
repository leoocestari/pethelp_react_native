import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useAdoptionList } from '../../contexts/AdoptionListContext';
import { api } from '../../Services/IdentityService'; // Ensure this is the correct path to your ApiService

const AdoptionList: React.FC = () => {
  const { adoptions, removeFromList, clearList } = useAdoptionList();

  const handleRemoveAnimal = (animalId: string) => {
    removeFromList(animalId);
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
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <View style={styles.animalCard}>
            <Text style={styles.animalText}>{item.Name}</Text>
            <Text style={styles.animalText}>{item.Species}</Text>
            <Text style={styles.animalText}>{item.Breed}</Text>
            <Text style={styles.animalText}>{item.Color}</Text>
            <Text style={styles.animalText}>{item.Gender}</Text>
            <Text style={styles.animalText}>{item.Temperament}</Text>
            <Button title="Remove" onPress={() => handleRemoveAnimal(item.Id)} />
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