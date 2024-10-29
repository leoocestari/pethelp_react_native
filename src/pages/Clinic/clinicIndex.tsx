import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../Services/IdentityService'; // Ensure this is the correct path to your ApiService

interface Clinic {
  Id: string;
  Name: string;
  Cnpj: string;
  PhoneNumber: string;
  Address: {
    City: string;
    Complement: string;
    Country: string;
    Neighborhood: string;
    Number: string;
    State: string;
    Street: string;
    ZipCode: string;
  };
}


const ClinicCard: React.FC<{ clinic: Clinic }> = ({ clinic }) => {
  const navigation = useNavigation<any>();
  
  const handlePress = () => {
    navigation.navigate('ClinicRegister', { clinic });
  }; 

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.cardTitle}>{clinic.Name}</Text>
      <Text style={styles.cardText}>Address: {clinic.Address.Street}</Text>
      <Text style={styles.cardText}>Phone: {clinic.PhoneNumber}</Text>
    </TouchableOpacity>
  );
};

const ClinicIndex: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await api.get('odata/Clinic?$expand=Address'); // Adjust the endpoint as needed
      setClinics(response.data.value);
    } catch (error) {
      console.error('Error fetching clinics:', error);
      Alert.alert('Error', 'Failed to fetch clinics');
    }
  };

  const handleAddClinic = () => {
    navigation.navigate('ClinicRegister'); // Adjust based on your navigation setup
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={clinics}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <ClinicCard clinic={item} />}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddClinic}>
        <Text style={styles.addButtonText}>Add Clinic</Text>
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

export default ClinicIndex;