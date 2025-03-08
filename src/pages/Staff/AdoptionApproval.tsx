import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../Services/IdentityService'; // Ensure this is the correct path to your ApiService
import { Adoption } from './models/Adoption';


const AdoptionApproval: React.FC = () => {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchPendingAdoptions();
  }, []);

  const fetchPendingAdoptions = async () => {
    try {
      const response = await api.get('/Adoption/Pending'); // Adjust the endpoint as needed
      setAdoptions(response.data.value);
    } catch (error) {
      console.error('Error fetching pending adoptions:', error);
      Alert.alert('Error', 'Failed to fetch pending adoptions');
    }
  };

  const handleViewDetails = (adoption: Adoption) => {
    navigation.navigate('AdoptionDetails', { adoption });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Adoptions</Text>
      <FlatList
        data={adoptions}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>User ID: {item.UserId}</Text>
            <Text style={styles.cardText}>Observation: {item.Observation}</Text>
            <Button title="View Details" onPress={() => handleViewDetails(item)} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
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
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});

export default AdoptionApproval;