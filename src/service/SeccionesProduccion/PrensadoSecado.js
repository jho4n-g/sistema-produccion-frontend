import { api } from '../api';

export const getObj = async () => {
  try {
    // console.log('En service barbotina');
    const data = await api.get('/barbotina');
    return data.data;
  } catch (e) {
    return e.message;
  }
};
