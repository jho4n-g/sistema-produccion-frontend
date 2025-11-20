import { api } from '../api';

export const getUsers = async () => {
  try {
    const data = await api.get('/users');
    return data.data;
  } catch (e) {
    return e.message;
  }
};

export const getRoles = async () => {
  try {
    const data = await api.get('/users/roles');
    return data.data;
  } catch (e) {
    return e.message;
  }
};

export const getIdUser = async (id) => {
  try {
    const data = await api.get(`/embalaje/${id}`);
    return data.data;
  } catch (e) {
    return e.message;
  }
};

export const LoginUser = async (username, password) => {
  try {
    const data = await api.post('/users/login', { username, password });
    return data.data;
  } catch (e) {
    return e.response.data;
  }
};

export const getMe = async (config) => {
  try {
    const data = await api.get('/auth/me', config);
    return data.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};
