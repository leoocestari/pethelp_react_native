import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../Services/IdentityService'; // Ensure this is the correct path to your ApiService
import { useAdoptionList } from '../../contexts/AdoptionListContext';

const AnimalInfo: React.FC = () => {
  const [animal, setAnimal] = useState<any>(null);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { addToList } = useAdoptionList();
  const animalId = (route.params as any)?.animalId;

  useEffect(() => {
    if (animalId) {
      fetchAnimal(animalId);
    }
  }, [animalId]);

  const fetchAnimal = async (animalId: string) => {
    try {
      const response = await api.get(`odata/Animal/${animalId}`); // Adjust the endpoint as needed
      setAnimal(response.data);
    } catch (error) {
      console.error('Error fetching animal:', error);
      Alert.alert('Error', 'Failed to fetch animal information');
    }
  };

  const handleSelectForAdoption = () => {
    addToList(animal);
    Alert.alert('Adoption', 'Animal added to adoption List');
  };

  const handleCreateSchedule = () => {
    navigation.navigate('CreateSchedule', { animalId: animal.id }); // Adjust based on your navigation setup
  };

  if (!animal) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {animal.Image && <Image source={{ uri: animal.Image }} style={styles.image} />}
      <Text style={styles.title}>{animal.Name}</Text>
      <Text style={styles.text}>Species: {animal.Species}</Text>
      <Text style={styles.text}>Breed: {animal.Breed}</Text>
      <Text style={styles.text}>Color: {animal.Color}</Text>
      <Text style={styles.text}>Gender: {animal.Gender}</Text>
      <Text style={styles.text}>Temperament: {animal.Temperament}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Select for Adoption" onPress={handleSelectForAdoption} />
        <View style={styles.buttonSpacer} />
        <Button title="Schedule a Visit" onPress={handleCreateSchedule} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSpacer: {
    width: 10,
  },
});

export default AnimalInfo;