import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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

const ClinicRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<any>();
  
  useEffect(() => {
    console.log('Clinic:', route.params);
    if (route.params && route.params["clinic"]) {
      const clinic = route.params["clinic"] as Clinic;
      setName(clinic.Name);
      setCnpj(clinic.Cnpj); 
      setPhoneNumber(clinic.PhoneNumber);
      setStreet(clinic.Address.Street);
      setNumber(clinic.Address.Number);
      setComplement(clinic.Address.Complement);
      setNeighborhood(clinic.Address.Neighborhood);
      setCity(clinic.Address.City);
      setState(clinic.Address.State);
      setCountry(clinic.Address.Country);
      setZipCode(clinic.Address.ZipCode);
    }
  }, [route.params?.clinic]);

  const handleRegister = async () => {
    if (!name || !cnpj || !phoneNumber || !street || !number || !neighborhood || !city || !state || !country || !zipCode) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    const clinicData = {
      name,
      cnpj,
      phoneNumber,
      Address: {
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        zipCode,
      },
    };

    setLoading(true);

    try {
      const response = await api.post('/Clinic/Create', clinicData);

      if (response.status === 201) {
        // Clear the form
        setName('');
        setCnpj('');
        setPhoneNumber('');
        setStreet('');
        setNumber('');
        setComplement('');
        setNeighborhood('');
        setCity('');
        setState('');
        setCountry('');
        setZipCode('');
        Alert.alert('Success', 'Clinic registered successfully!');
        navigation.goBack(); // Adjust based on your navigation setup
      } else {
        const errorData = await response.data;
        Alert.alert('Error', errorData.message || 'Failed to register clinic');
      }
    } catch (error) {
      Alert.alert('Error', (error as any).message || 'Failed to register clinic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register a New Clinic</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="Number"
        value={number}
        onChangeText={setNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Complement"
        value={complement}
        onChangeText={setComplement}
      />
      <TextInput
        style={styles.input}
        placeholder="Neighborhood"
        value={neighborhood}
        onChangeText={setNeighborhood}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="Register" onPress={handleRegister} />
      )}
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
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  goBackButtonText: {
    color: '#007BFF',
    fontSize: 16,
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

export default ClinicRegister;