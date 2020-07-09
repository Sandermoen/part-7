import blogsTypes from './blogsTypes';

const INITIAL_STATE = [];

const blogsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case blogsTypes.GET_ALL: {
      return action.payload;
    }
    case blogsTypes.CREATE_BLOG: {
      return [...state, action.payload];
    }
    case blogsTypes.DELETE_BLOG: {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    }
    case blogsTypes.LIKE_BLOG: {
      const id = action.payload;
      return state.map((blog) => {
        if (blog.id === id) {
          blog.likes++;
        }
        return blog;
      });
    }
    case blogsTypes.ADD_COMMENT: {
      const { id, message } = action.payload;
      return state.map((blog) => {
        if (blog.id === id) {
          blog.comments.push(message);
        }
        return blog;
      });
    }
    default: {
      return state;
    }
  }
};

export default blogsReducer;
