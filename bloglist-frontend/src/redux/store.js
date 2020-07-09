import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationsReducer from './notifications/notificationsReducer';
import blogsReducer from './blogs/blogsReducer';
import userReducer from './user/userReducer';

const reducer = combineReducers({
  notifications: notificationsReducer,
  blogs: blogsReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
