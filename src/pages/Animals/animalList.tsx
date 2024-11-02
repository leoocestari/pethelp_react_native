import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../Services/IdentityService'; // Ensure this is the correct path to your ApiService
import PencilIcon from './../../../assets/PencilIcon.svg'; // Ensure this is the correct path to your SVG
import { Animal } from './models/animalModel';



const AnimalCard: React.FC<{ animal: Animal }> = ({ animal }) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('AnimalInfo', { animalId: animal.Id });
  };

  const handleEdit = () => {
    navigation.navigate('AnimalRegister', { animal });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{animal.Name}</Text>
          <Text style={styles.cardText}>Species: {animal.Species}</Text>
          <Text style={styles.cardText}>Breed: {animal.Breed}</Text>
          <Text style={styles.cardText}>Color: {animal.Color}</Text>
          <Text style={styles.cardText}>Gender: {animal.Gender}</Text>
          <Text style={styles.cardText}>Temperament: {animal.Temperament}</Text>
          {/*animal.image && <Image source={{ uri: animal.image }} style={styles.image} />*/}
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <PencilIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await api.get('odata/Animal'); // Adjust the endpoint as needed
      setAnimals(response.data.value);
    } catch (error) {
      console.error('Error fetching animals:', error);
      Alert.alert('Error', 'Failed to fetch animals');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAnimals();
    setRefreshing(false);
  };

  const handleAddAnimal = () => {
    navigation.navigate('AnimalRegister'); // Adjust based on your navigation setup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animals</Text>
      <FlatList
        data={animals}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <AnimalCard animal={item} />}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAnimal}>
        <Text style={styles.addButtonText}>Add Animal</Text>
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
    paddingBottom: 20,
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  editButton: {
    padding: 10,
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

export default AnimalList;