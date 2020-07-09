import notificationTypes from './notificationTypes';

export const hideNotification = () => ({
  type: notificationTypes.HIDE_NOTIFICATION,
});

export const showNotification = (message, error) => (dispatch, getState) => {
  const state = getState();
  if (state.notifications.show) {
    clearTimeout(state.notifications.timeoutId);
  }
  const timeoutId = setTimeout(() => {
    dispatch(hideNotification());
  }, 10000);
  dispatch({
    type: notificationTypes.SHOW_NOTIFICATION,
    payload: { message, timeoutId, error },
  });
};
