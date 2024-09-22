import * as SecureStore from 'expo-secure-store';
import { json } from 'stream/consumers';

type token = {
    token?: string,
    refreshToken?: string,
    expiresIn?: number,
    tokenType?: string,
    creationDate?: Date
}

type actions = "logIn" | "refresh" | "getToken" | "checkLife" | "logout";

export const tokenReducer = (state: token, action: {type: actions, payload: token}): token => {
    const payload = action.payload;
    switch(action.type) {
        case 'logIn':
            return { ...state, token: payload.token, refreshToken: payload.refreshToken, expiresIn: payload.expiresIn, tokenType: payload.tokenType, creationDate: new Date() };
        case 'refresh':
            return { ...state, token: payload.token, refreshToken: payload.refreshToken, expiresIn: payload.expiresIn, tokenType: payload.tokenType, creationDate: new Date() };
        case 'getToken':
            return payload.token ? { ...state, token: payload.token } : state;
        case 'checkLife':
            if (state.creationDate && state.expiresIn) {
                const diff = new Date().getTime() - state.creationDate.getTime();
                if (diff > state.expiresIn * 1000) {
                    return { ...state, token: undefined, expiresIn: undefined, tokenType: undefined, creationDate: undefined };
                }
            }
            return state;
        case 'logout':
            return { ...state, token: undefined, refreshToken: undefined, expiresIn: undefined, tokenType: undefined, creationDate: undefined };
        default:
            return state;
    }
}


export class AsyncStorageSaver {
    public static async saveToken(token: string) {
        await SecureStore.setItemAsync('token', token)
    }

    public static getToken() {
        return SecureStore.getItem('token')
    }
    
    public static async clearToken() {      
        await SecureStore.deleteItemAsync('token')
    }
}