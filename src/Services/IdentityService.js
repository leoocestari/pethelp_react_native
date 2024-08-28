import AsyncStorage from "@react-native-community/async-storage";
import { getToken } from "../lib/AsyncStorageSaver";

const BASE_API = 'http://192.168.0.205:8080';

export default {
  checkToken: async () => {
    // Implementação do checkToken se necessário
  },

  Login: async (email, password) => {
    const response = await fetch(`${BASE_API}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response?.ok) {
      console.log(response);
    }

    return await response.json();
  },

  UserInfo: async () => {
    const token = getToken();

    const response = await fetch(`${BASE_API}/user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  }
}
