import axios from 'axios';

export const login = (email, password) => {
  return axios.post('/api/login', { email, password });
};
