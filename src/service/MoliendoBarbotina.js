import { api } from './api';

export const RegisterObg = async (payload) => {
  const res = await api.post('/registerBarbotina', payload);
  // si llegó aquí, es 2xx (axios lanza en 4xx/5xx)
  return res.data; // o res, como prefieras, pero mejor data
};
