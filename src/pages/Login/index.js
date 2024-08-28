import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
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

import Logo from '../../../assets/logo1.svg';
import EmailIcon from '../../../assets/email.svg';
import PasswordIcon from '../../../assets/lock.svg';
import IdentityService from '../../Services/IdentityService';
import { saveToken } from '../../lib/AsyncStorageSaver';

export default () => {

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const navigation = useNavigation();

  const handleMessageButtonClick = (value) => {
    navigation.reset({
      routes: [{ name: 'Register' }]
    })
  }

  const handleButtonClick = (value) => {
    navigation.reset({
      routes: [{ name: 'Tabroutes' }]
    })
  }



  const handleSignClick = async () => {

    if (emailField === undefined || passwordField === undefined)
      return;

    const req = IdentityService.Login(emailField, passwordField)

    if (req && req.status) {
      return;
    }

    saveToken(req.token, req.refreshToken);

    navigation.reset({
      routes: [{ name: 'Tabroutes' }]
    })

  }


  return (
    <Container>
      <Logo width="100%" height="180" />

      <InputArea>
        <LoginInput
          IconSvg={EmailIcon}
          placeholder="Digite seu Email"
          value={emailField}
          onChangeText={setEmailField}
        />

        <LoginInput
          IconSvg={PasswordIcon}
          placeholder="Digite a senha"
          value={passwordField}
          password={true}
          onChangeText={setPasswordField}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Ainda não tem uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Realize seu cadastro</SignMessageButtonTextBold>
      </SignMessageButton>

      <SignMessageButton onPress={handleButtonClick}>
        <SignMessageButtonText>Home</SignMessageButtonText>
      </SignMessageButton>
    </Container>
  );
}