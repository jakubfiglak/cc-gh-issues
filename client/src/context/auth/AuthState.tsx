import React, { useReducer, FC } from 'react';
import { axiosJson, setAuthToken } from '../../config/axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { State } from './types';

export const AuthState: FC = ({ children }) => {
  const initialState: State = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    error: null,
    loadUser: () => null,
    authenticate: () => null,
    setLoading: () => null,
    clearErrors: () => null,
    logout: () => null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Authenticate
  const authenticate = async (code: string) => {
    setLoading();
    try {
      const res = await axiosJson.post('/github/authenticate', { code });

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: res.data.token,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Load user
  const loadUser = async () => {
    setLoading();
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axiosJson.get('https://api.github.com/user');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Clear errors
  const clearErrors = () =>
    dispatch({
      type: 'CLEAR_ERRORS',
    });

  const { user, token, isAuthenticated, loading, error } = state;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        authenticate,
        loadUser,
        logout,
        setLoading,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
