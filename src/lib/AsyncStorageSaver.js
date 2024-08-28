import AsyncStorage from "@react-native-community/async-storage"

export const saveToken = (token, refreshToken) => {
    AsyncStorage.setItem('token', token)
    AsyncStorage.setItem('refreshToken', refreshToken)
}

export const getToken = async () => {
    return await AsyncStorage.getItem('token')
}

export const getRefreshToken = async () => {
    return await AsyncStorage.getItem('refreshToken')
}