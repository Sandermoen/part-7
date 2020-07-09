import notificationTypes from './notificationTypes';

const INITIAL_STATE = {
  message: '',
  timeoutId: null,
  error: false,
  show: false,
};

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case notificationTypes.SHOW_NOTIFICATION: {
      const { message, timeoutId, error } = action.payload;
      return {
        message,
        timeoutId,
        error,
        show: true,
      };
    }
    case notificationTypes.HIDE_NOTIFICATION: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default notificationsReducer;
