import { createContext } from "react"

export type TokenContext = {
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    tokenType: string,
    creationDate?: Date
}

export const tokenContext = createContext<TokenContext|undefined>(undefined)

export function useTokenContext() {
    const context = tokenContext
    if (!context) {
        throw new Error('useTokenContext must be used within a TokenProvider')
    }
    return context
}