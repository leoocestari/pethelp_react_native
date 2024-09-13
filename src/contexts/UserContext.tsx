import React, { createContext, useReducer } from 'react';
import { ContextState, initialState, UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext<ContextState | undefined>(undefined);

