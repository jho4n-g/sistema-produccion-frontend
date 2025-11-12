import { api } from '../api.js';

export const registerObj = async (payload) => {
  try {
    const response = await api.post('/embalaje', payload);
    return response.data;
  } catch (error) {
    // Log para debugging
    console.error('Error en servicio registerObj:', {
      endpoint: '/embalaje',
      error: error.response?.data || error.message,
    });

    // Propagar el error para manejo en el componente
    throw error;
  }
};

export const getObj = async () => {
  try {
    // console.log('En service barbotina');
    const data = await api.get('/embalaje');
    return data.data;
  } catch (e) {
    return e.message;
  }
};
