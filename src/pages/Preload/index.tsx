import React, { useEffect } from "react";
import { Text } from "react-native";
import { Container, LoadingIcon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

import Logo from "../../../assets/logo1.svg";
import { StackTypes } from "../../router";
import { IdentityService } from "../../Services/IdentityService";

export default () => {
  const navigation = useNavigation<StackTypes>();

  useEffect(() => {
    IdentityService.getToken().then(token => {      
      if (token) {
        navigation.reset({
          routes: [{ name: "Tabroutes" }],
        });
      } else {
        navigation.reset({
          routes: [{ name: "Login" }],
        });
      }
    });
  }, []);

  return (
    <Container>
      <Logo width="100%" height="180"></Logo>
      <LoadingIcon size="large" color="#fff" />
    </Container>
  );
};
