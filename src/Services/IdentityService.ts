import { AsyncStorageSaver } from '../lib/AsyncStorageSaver';
import { TokenContext } from '../contexts/tokenContext';
import axios from 'axios';
import { navigate } from '../router'; // Adjust the import based on your navigation setup

export const BASE_API = 'http://192.168.0.205:58407';

export const api = axios.create({
  baseURL: BASE_API,
});

api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokenContext = await IdentityService.refreshToken(JSON.parse(AsyncStorageSaver.getToken()!).refreshToken);

      if (tokenContext) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenContext.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${tokenContext.accessToken}`;
        return axios(originalRequest);
      } else {
        AsyncStorageSaver.clearToken();
        navigate('Login'); // Adjust based on your navigation setup
      }
    } 

    return Promise.reject(error);
  }
);


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
    if (!response || response?.status)
      return;

    const tokenContext: TokenContext = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresIn: response.expiresIn,
      creationDate: new Date(),
      tokenType: response.tokenType
    };

    AsyncStorageSaver.saveToken(JSON.stringify(tokenContext));
    return tokenContext;
  }

  public static async Login(email: string, password: string): Promise<any> {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  public static async refreshToken(refreshToken: string): Promise<any> {
    try {
      const response = await api.post('/refresh', { refreshToken });
      AsyncStorageSaver.saveToken(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      AsyncStorageSaver.clearToken();
      navigate('Login'); // Adjust based on your navigation setup
    }
  }
}