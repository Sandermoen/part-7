import axios from 'axios';
import errorHandler from './errorHandler';
const baseUrl = 'http://localhost:3001/api/users';

const getAll = async () => {
  try {
    const users = await axios.get(baseUrl);
    return users.data;
  } catch (err) {
    errorHandler(err);
  }
};

export default {
  getAll,
};
