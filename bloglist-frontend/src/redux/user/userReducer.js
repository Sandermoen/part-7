import userTypes from './userTypes';

const INITIAL_STATE = null;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_USER:
    case userTypes.LOGIN: {
      return action.payload;
    }
    case userTypes.LOGOUT: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
