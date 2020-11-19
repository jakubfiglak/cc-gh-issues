import axios from 'axios';

export const axiosJson = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosJson.defaults.headers.common.authorization = `token ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};
