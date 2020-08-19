import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  },
});

export default api;