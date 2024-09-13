import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorageSaver } from "../lib/AsyncStorageSaver";
import { useContext } from "react";
import { TokenContext, tokenContext } from "../contexts/tokenContext";

const BASE_API = 'http://192.168.0.205:8080';

export class IdentityService {
  public async checkToken() {
    // Implementação do checkToken se necessário
  }

  public static getToken = async (email?: string, password?: string): Promise<TokenContext | undefined> => {
    const token = AsyncStorageSaver.getToken();

    if (!token) {
      if (!email || !password)
        return;

      return this.processToken(await this.Login(email, password));
    }

    const parse = JSON.parse(token) as TokenContext;

    if (!parse.creationDate || !parse.expiresIn)
      return;

    const diff = new Date().getTime() - parse.creationDate.getTime();

    if (diff > parse.expiresIn * 1000)
      return this.processToken(await this.refreshToken(parse.refreshToken))
    
    return parse;
  }

  private static processToken(response: any): TokenContext | undefined {

    if (response.status)
      return;

    response.creationDate = new Date();

    AsyncStorageSaver.saveToken(response.token);
    return response;
  }

  public static async refreshToken(refreshToken: string) {
    const response = await fetch(`${BASE_API}/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
    });
    return await response.json();
  }

  public static async Login(email: string, password: string) {
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
  }

  public async UserInfo() {
    const token = await AsyncStorageSaver.getToken();

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
