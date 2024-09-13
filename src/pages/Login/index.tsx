
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold



} from './styles';

import { NavigationRouteContext, useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { IdentityService } from '../../Services/IdentityService';
import { StackTypes } from '../../router';
import React from 'react';
import Logo from '../../../assets/logo.svg';
import EmailIcon from '../../../assets/email.svg';
import PasswordIcon from '../../../assets/lock.svg';
import { LoginInput } from '../../components/LoginInput';
import { AsyncStorageSaver } from '../../lib/AsyncStorageSaver';
import { tokenContext } from '../../contexts/tokenContext';

export default () => {

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const navigation = useNavigation<StackTypes>();

  const token = useContext(tokenContext);

  const handleMessageButtonClick = () => {
    navigation.navigate('Register');
  }

  const handleButtonClick = () => {
    navigation.reset({
      routes: [{ name: 'Preload' }]
    })
  }



  const handleSignClick = async () => {

    if (emailField === undefined || passwordField === undefined)
      return;

    const req = await IdentityService.getToken(emailField, passwordField)

    if (!req)
      return;

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