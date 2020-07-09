import blogsTypes from './blogsTypes';
import blogsService from '../../services/blogs';
import { showNotification } from '../notifications/notificationsActions';

const getAllBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogsService.getAll();
    dispatch({ type: blogsTypes.GET_ALL, payload: blogs });
  } catch (err) {
    dispatch(showNotification(err.message, true));
  }
};

const createBlog = (title, author, url, token) => async (dispatch) => {
  try {
    const blog = await blogsService.create(title, author, url, token);
    dispatch({ type: blogsTypes.CREATE_BLOG, payload: blog });
    dispatch(showNotification(`a new blog ${title} by ${author} added`));
  } catch (err) {
    dispatch(showNotification(err.message, true));
  }
};

const deleteBlog = (id, token) => async (dispatch) => {
  try {
    await blogsService.deleteBlog(id, token);
    dispatch({ type: blogsTypes.DELETE_BLOG, payload: id });
    dispatch(showNotification('Blog deleted'));
  } catch (err) {
    dispatch(showNotification(err.message, true));
  }
};

const likeBlog = (blog) => async (dispatch, getState) => {
  const state = getState();
  const token = state.user.token;
  try {
    await blogsService.like(blog, token);
    dispatch({ type: blogsTypes.LIKE_BLOG, payload: blog.id });
  } catch (err) {
    dispatch(showNotification(err.message, true));
  }
};

const addComment = (id, message) => async (dispatch, getState) => {
  const state = getState();
  const token = state.user.token;
  try {
    await blogsService.comment(id, message, token);
    dispatch({ type: blogsTypes.ADD_COMMENT, payload: { id, message } });
  } catch (err) {
    dispatch(showNotification(err.message, true));
  }
};

export default {
  getAllBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
  addComment,
};
