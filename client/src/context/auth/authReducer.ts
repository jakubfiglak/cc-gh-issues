import { State, Action } from '../../types/auth';

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case 'LOGOUT':
      localStorage.clear();
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
