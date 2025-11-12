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
    throw e.message;
  }
};

export const getIdObj = async (id) => {
  try {
    const res = await api.get(`/embalaje/${id}`);
    return res.data;
  } catch (e) {
    if (e?.response) {
      const msg =
        e.response.data?.msg ||
        e.response.data?.message ||
        e.message ||
        'Error en la solicitud';

      const err = new Error(msg);
      err.status = e.response.status; // ← útil en el front
      err.payload = e.response.data; // ← detalle de validación, etc.
      throw err; // ← lanza un Error real
    }
    throw e; // red/timeout u otros
  }
};

export const UpdateIdObj = async (id, updateddata) => {
  try {
    const data = await api.put(`/embalaje/${id}`, updateddata);
    return data.data;
  } catch (e) {
    console.log(e);
    if (e?.response) {
      const err = new Error(
        e.response.data?.msg || e.response.data?.message || e.message
      );
      err.status = e.response.status;
      err.payload = e.response.data;
      throw err; // ⬅️ re-lanza para que tu catch externo lo capture
    }
    throw e; // ⬅️ no “te comas” errores de red u otros
  }
};
