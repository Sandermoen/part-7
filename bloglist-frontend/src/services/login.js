import axios from 'axios';
import errorHandler from './errorHandler';
const baseUrl = '/api/login';

const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, { username, password });
    return response.data;
  } catch (err) {
    return errorHandler(err);
  }
};

export default {
  login,
};
