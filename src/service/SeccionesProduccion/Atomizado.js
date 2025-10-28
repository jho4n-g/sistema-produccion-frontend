import { api } from '../api';

export const registerObj = async (payload) => {
  const res = await api.post('/atomizado', payload);
  return res.data;
};
