import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface AnimalCardProps {
  animal: {
    id: string;
    name: string;
    species: string;
    imageUrl: string;
  };
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: animal.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{animal.name}</Text>
          <Text style={styles.species}>{animal.species}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
    maxHeight: 120,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  species: {
    fontSize: 14,
    color: '#666',
  },
});

export default AnimalCard;