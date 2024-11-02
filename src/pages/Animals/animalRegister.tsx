import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../Services/IdentityService'; // Ensure this is the correct path to your ApiService
import { Picker } from '@react-native-picker/picker';
import { Clinic } from '../Clinic/models/Clinic';

const AnimalRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [gender, setGender] = useState('');
  const [temperament, setTemperament] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const animal = (route.params as any)?.animal;

  useEffect(() => {
    fetchClinics();
    if (animal) {
      setName(animal.Name);
      setSpecies(animal.Species);
      setBreed(animal.Breed);
      setColor(animal.Color);
      setGender(animal.Gender);
      setTemperament(animal.Temperament);
      setImageUri(animal.ImageUri);
      setSelectedClinic(animal.ClinicId);
    }
  }, [animal]);

  const fetchClinics = async () => {
    try {
      const response = await api.get('oData/Clinic'); // Adjust the endpoint as needed
      console.log('Clinics:', response.data.value);
      setClinics(response.data.value);
    } catch (error) {
      console.error('Error fetching clinics:', error);
      Alert.alert('Error', 'Failed to fetch clinics');
    }
  };

  const handleRegister = async () => {
    if (!name || !species || !breed || !color || !gender || !temperament || !imageUri || !selectedClinic) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const animalData = {
      name,
      species,
      breed,
      color,
      gender,
      temperament,
      image: imageUri,
      clinicId: selectedClinic,
    };

    setLoading(true);

    try {
      const response = await api.post('/Animal/Create', animalData);

      if (response.status === 200) {
        // Clear the form
        setName('');
        setSpecies('');
        setBreed('');
        setColor('');
        setGender('');
        setTemperament('');
        setImageUri('');
        setSelectedClinic('');
        Alert.alert('Success', 'Animal registered successfully!');
      } else {
        const errorData = await response.data;
        Alert.alert('Error', errorData.message || 'Failed to register animal');
      }
    } catch (error) {
      Alert.alert('Error', (error as any).message || 'Failed to register animal');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register a New Animal</Text>
      {imageUri ? (
        <View style={styles.imageFrame}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      ) : (
        <View style={styles.imageFramePlaceholder}>
          <Text style={styles.imageFrameText}>No Image Selected</Text>
        </View>
      )}
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
        <Text style={styles.imagePickerText}>Pick an Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Species"
        value={species}
        onChangeText={setSpecies}
      />
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Temperament"
        value={temperament}
        onChangeText={setTemperament}
      />
      <Picker
        selectedValue={selectedClinic}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedClinic(itemValue)}
      >
        <Picker.Item label="Select a Clinic" value="" />
        {clinics.map((clinic: Clinic) => (
          <Picker.Item key={clinic.Id} label={clinic.Name} value={clinic.Id} />
        ))}
      </Picker>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageFrame: {
    width: '100%',
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageFramePlaceholder: {
    width: '100%',
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  imageFrameText: {
    color: '#888',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePicker: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
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
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
});

export default AnimalRegister;