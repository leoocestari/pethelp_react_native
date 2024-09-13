export const initialState  = {
  avatar: '',
  favorites: [],
  appointments: []
};

type actions = "setAvatar" | "logIn";

export interface ContextState {
  avatar: string,
  favorites: string[],
  appointments: string[]
};

export const UserReducer = (state: ContextState, action: {type: actions, payload: ContextState}) => {
  switch(action.type) {
    case 'setAvatar':
      return { ...state, avatar: action.payload.avatar };
    case 'logIn':

      return { ...state, avatar: action.payload.avatar, favorites: action.payload.favorites, appointments: action.payload.appointments };
    default:
        return state;
  }
}