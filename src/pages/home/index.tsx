import React, { useContext } from 'react';
import { Container } from './styles';
import { Text } from 'react-native';
import { tokenContext } from '../../contexts/tokenContext';

export default () => {

  let context = useContext(tokenContext);

  let a = 1;

  return (
    <Container>
      <Text>Home</Text>
    </Container>
  );
}