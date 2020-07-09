import React, { useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Toggleable from './Toggleable';
import NewBlogForm from './NewBlogForm';
import Blog from './Blog';

import blogsActions from '../redux/blogs/blogsActions';

const BlogList = () => {
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const createBlog = async (title, author, url) => {
    dispatch(blogsActions.createBlog(title, author, url, user.token));
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Fragment>
      <div>
        <h1>Create New</h1>
        <Toggleable buttonLabel="New blog" ref={blogFormRef}>
          <NewBlogForm createBlog={createBlog} />
        </Toggleable>
      </div>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={() =>
                dispatch(blogsActions.deleteBlog(blog.id, user.token))
              }
            />
          ))}
      </div>
    </Fragment>
  );
};

export default BlogList;
