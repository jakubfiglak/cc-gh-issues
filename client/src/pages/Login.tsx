import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const Login = () => {
  const location = useLocation();
  const code = location.search.split('?code=')[1];

  useEffect(() => {
    const getAuthToken = async (code: string) => {
      const res = await axios.post('/github/authenticate', { code });
      console.log(res.data);
    };
    if (code) {
      getAuthToken(code);
    }
  }, [code]);

  return <div>Login</div>;
};
