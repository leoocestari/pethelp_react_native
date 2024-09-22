import { AsyncStorageSaver } from "../lib/AsyncStorageSaver";
import { TokenContext } from "../contexts/tokenContext";

const BASE_API = 'http://192.168.0.205:50277';

export class IdentityService {

  public static getToken = async (email?: string, password?: string): Promise<TokenContext | undefined> => {
    const token = AsyncStorageSaver.getToken();
    
    if (!token) 
      if (!email || !password) return;
      else return this.processToken(await this.Login(email, password));

    const parse = JSON.parse(token) as TokenContext;
    
    if (!parse.creationDate || !parse.expiresIn)
      return;

    parse.creationDate = new Date(parse.creationDate);

    const diff = new Date().getTime() - parse.creationDate.getTime();

    if (diff > parse.expiresIn * 1000){      
      return this.processToken(await this.refreshToken(parse.refreshToken))
    }
    
    return parse;
  }

  private static processToken(response: any): TokenContext | undefined {
    console.log('a');
    
    if (response?.status)
      return;

    response.creationDate = new Date();

    AsyncStorageSaver.saveToken(JSON.stringify(response));
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

    const token = await response.json();
    
    if (!token){
      AsyncStorageSaver.clearToken();
      return;
    }

    return await response.json();
  }

  public static async Login(email: string, password: string) {
    console.log(BASE_API + '/login');
    
    const response = await fetch(`${BASE_API}/login`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    console.log(response);

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
