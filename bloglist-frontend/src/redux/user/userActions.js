import userTypes from './userTypes';
import { showNotification } from '../notifications/notificationsActions';
import loginService from '../../services/login';

const login = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login(username, password);
    dispatch({ type: userTypes.LOGIN, payload: user });
    window.localStorage.setItem('user', JSON.stringify(user));
  } catch (err) {
    dispatch(showNotification(err.message, true));
  }
};

const logout = () => {
  window.localStorage.removeItem('user');
  return {
    type: userTypes.LOGOUT,
  };
};

const setUser = (user) => ({
  type: userTypes.SET_USER,
  payload: user,
});

export default {
  login,
  logout,
  setUser,
};
