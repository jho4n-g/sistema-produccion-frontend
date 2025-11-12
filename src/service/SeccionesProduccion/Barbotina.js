import { api } from '../api';

export const RegisterObg = async (payload) => {
  try {
    const res = await api.post('/barbotina', payload);
    // si llegó aquí, es 2xx (axios lanza en 4xx/5xx)
    return res.data; // o res, como prefieras, pero mejor data
  } catch (e) {
    console.log(e);
    return 'Error del servidor';
  }
};

export const getObj = async () => {
  try {
    // console.log('En service barbotina');
    const data = await api.get('/barbotina');
    return data.data;
  } catch (e) {
    return e.message;
  }
};

export const getIdObj = async (id) => {
  try {
    const data = await api.get(`/barbotina/${id}`);
    return data.data;
  } catch (e) {
    return e.message;
  }
};
