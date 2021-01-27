import axios from 'axios';

const END_POINT = 'http://localhost:9000';

const api = axios.create({
  baseURL: END_POINT
});

export default api;