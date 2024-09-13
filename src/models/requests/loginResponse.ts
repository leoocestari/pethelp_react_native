export interface LoginResponse {
    acessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
}