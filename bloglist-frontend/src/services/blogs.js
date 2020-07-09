import axios from 'axios';
import errorHandler from './errorHandler';
const baseUrl = '/api/blogs';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    return errorHandler(err);
  }
};

const create = async (title, author, url, token) => {
  try {
    const response = await axios.post(
      baseUrl,
      { title, author, url },
      { headers: { Authorization: `bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    return errorHandler(err);
  }
};

const like = async (blog, token) => {
  const { id, ...blogFields } = blog;
  try {
    const response = await axios.put(
      `${baseUrl}/${id}`,
      { ...blogFields, likes: blogFields.likes + 1 },
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    return errorHandler(err);
  }
};

const deleteBlog = async (id, token) => {
  try {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });
  } catch (err) {
    return errorHandler(err);
  }
};

const comment = async (id, message, token) => {
  try {
    await axios.post(
      `${baseUrl}/${id}/comments`,
      { message },
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
  } catch (err) {
    return errorHandler(err);
  }
};

export default { getAll, create, like, deleteBlog, comment };
