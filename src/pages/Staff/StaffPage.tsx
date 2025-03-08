import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StaffPage: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleNavigateToApproval = () => {
    navigation.navigate('AdoptionApproval');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Page</Text>
      <Button title="Approve Adoptions" onPress={handleNavigateToApproval} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default StaffPage;