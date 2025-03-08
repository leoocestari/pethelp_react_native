import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../Services/IdentityService'; // Ensure this is the correct path to your ApiService

const AdoptionDetails: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { adoption } = route.params as any;

  const handleApprove = async () => {
    try {
      await api.put(`/Adoption/Approve/${adoption.id}`); // Adjust the endpoint as needed
      Alert.alert('Success', 'Adoption approved successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error approving adoption:', error);
      Alert.alert('Error', 'Failed to approve adoption');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adoption Details</Text>
      <Text style={styles.cardText}>User ID: {adoption.userId}</Text>
      <Text style={styles.cardText}>Observation: {adoption.observation}</Text>
      <FlatList
        data={adoption.animals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.animalCard}>
            <Text style={styles.animalText}>Name: {item.name}</Text>
            <Text style={styles.animalText}>Species: {item.species}</Text>
            <Text style={styles.animalText}>Breed: {item.breed}</Text>
            <Text style={styles.animalText}>Color: {item.color}</Text>
            <Text style={styles.animalText}>Gender: {item.gender}</Text>
            <Text style={styles.animalText}>Temperament: {item.temperament}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <Button title="Approve Adoption" onPress={handleApprove} />
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
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
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

export default AdoptionDetails;