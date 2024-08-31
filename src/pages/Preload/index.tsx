import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../../assets/logo1.svg';
import { StackTypes } from '../../router';

export default () => {

  const navigation = useNavigation<StackTypes>();

  useEffect(()=>{
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token !== null) {

      } else {
        navigation.navigate('Login');

      }
      
    }
    checkToken();
  }, []);

  return (
    <Container>
      <Logo width="100%" height="180"></Logo>
      <LoadingIcon size="large" color="#fff" />

    </Container>
  );
}