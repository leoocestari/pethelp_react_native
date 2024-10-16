import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AnimalRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleRegister = () => {
    if (name === '' || species === '' || imageUrl === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Handle the registration logic here (e.g., API call)
    console.log('Animal registered:', { name, species, imageUrl });

    // Clear the form
    setName('');
    setSpecies('');
    setImageUrl('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register a New Animal</Text>
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
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Button title="Register" onPress={handleRegister} />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AnimalRegister;