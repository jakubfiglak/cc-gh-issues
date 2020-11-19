import React, { useReducer, FC } from 'react';
import { axiosJson, setAuthToken } from '../../config/axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { State } from '../../types/auth';
import { Loader } from '../../components/Loader';

const localUser = localStorage.getItem('user');
const localIsAuthenticated = localStorage.getItem('isAuthenticated');

export const AuthState: FC = ({ children }) => {
  const initialState: State = {
    user: localUser ? JSON.parse(localUser) : null,
    token: localStorage.getItem('token'),
    isAuthenticated: localIsAuthenticated
      ? JSON.parse(localIsAuthenticated)
      : false,
    loading: false,
    error: null,
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
      const authResponse = await axiosJson.post('/github/authenticate', {
        code,
      });
      setAuthToken(authResponse.data.token);
      const userResponse = await axiosJson.get('https://api.github.com/user');

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { token: authResponse.data.token, user: userResponse.data },
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

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        authenticate,
        logout,
        setLoading,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
