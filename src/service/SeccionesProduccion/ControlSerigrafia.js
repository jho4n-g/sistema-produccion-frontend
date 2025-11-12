import { api } from '../api.js';

export const registerObj = async (payload) => {
  const res = await api.post('/serigrafia', payload);
  return res.data;
};

export const getObj = async () => {
  try {
    // console.log('En service barbotina');
    const data = await api.get('/serigrafia');
    return data.data;
  } catch (e) {
    return e.message;
  }
};
