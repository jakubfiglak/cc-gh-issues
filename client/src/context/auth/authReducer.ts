import { State, Action } from './types';

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case 'AUTH_SUCCESS':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
