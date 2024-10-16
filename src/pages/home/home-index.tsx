import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import AnimalCard from './components/animalCard';

//use AnimalCard to create a screen that display many animals
const Home: React.FC = () => {
  const animals = [
    {
      id: '1',
      name: 'Dog',
      species: 'Canis lupus familiaris',
      imageUrl: 'https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png',
    },
    {
      id: '2',
      name: 'Cat',
      species: 'Felis catus',
      imageUrl: 'https://premierpet.com.br/wp-content/uploads/2023/12/model-banner-siames-mobile-v1-1024x1024.png',
    },
    {
      id: '3',
      name: 'Parrot',
      species: 'Psittaciformes',
      imageUrl: 'https://www.adema.se.gov.br/wp-content/uploads/2020/12/papagaio-verdadeiro.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default Home;