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

import { LoginInput } from '../../components/LoginInput';
import Logo from '../../../assets/logo1.svg';
import EmailIcon from '../../../assets/email.svg';
import PasswordIcon from '../../../assets/lock.svg';
import PhoneIcon from '../../../assets/phone.svg';
import UserIcon from '../../../assets/usericon.svg';
import { StackTypes } from '../../router';

export default () => {

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [phoneField, setPhoneField] = useState('');
  const [nameField, setNameField] = useState('');

  const navigation = useNavigation<StackTypes>();

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: 'Login' }]
    })

  }

  const handleSignClick = () => {

  }


  return (
    <Container>
      <Logo width="100%" height="180" />

      <InputArea>
        <LoginInput
          IconSvg={UserIcon}
          placeholder="Digite seu Nome"
          value={emailField}
          onChangeText={setNameField}
        />

        <LoginInput
          IconSvg={PhoneIcon}
          placeholder="Digite seu Telefone"
          value={phoneField}
          onChangeText={setPhoneField}
        />

        <LoginInput
          IconSvg={EmailIcon}
          placeholder="Digite seu Email"
          value={passwordField}
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
          <CustomButtonText>Realizar Cadastro</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já tem uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Acesse já!</SignMessageButtonTextBold>
      </SignMessageButton>



    </Container>
  );
}