import { useContext } from 'react';
import AuthProvider from '../providers/auth.provider.jsx';

const useAuth = () => {
  return useContext(AuthProvider);
};

export default useAuth;
