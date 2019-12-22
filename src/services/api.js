import axios from 'axios';
import { toast } from 'react-toastify';

import { store } from '~/store';

import { signOut } from '~/store/modules/auth/actions';
import history from '~/services/history';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async err => {
    if (err.response.status === 401) {
      store.dispatch(signOut());

      history.push('/');

      toast.error('Acesso não autorizado');
    }
    return Promise.reject(err);
  }
);

export default api;
