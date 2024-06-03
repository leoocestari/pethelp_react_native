import React from 'react';
import { Text } from 'react-native';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
  


} from './styles';

import LoginInput from '../../components/LoginInput';

import Logo from '../../../assets/logo1.svg'

export default () => {
  return (
    <Container>
      <Logo width="100%" height="180" />

      <InputArea>
        <LoginInput />
        
        <LoginInput />

        <CustomButton>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton>
        <SignMessageButtonText>Ainda não tem uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Realize seu cadastro</SignMessageButtonTextBold>
      </SignMessageButton>



    </Container>
  );
}