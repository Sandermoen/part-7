import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Button from './Button';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledBlog = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #212131;
  box-shadow: 0 5px 15px black;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  opacity: 0;
  transform: translateY(0);
  animation: ${fadeIn} 500ms ease-out forwards;
`;

const BlogLink = styled(Link)`
  text-decoration: none;
  color: currentColor;
  font-size: 2rem;
  margin-right: 2rem;
  font-weight: 700;
`;

const Blog = ({ blog, deleteBlog }) => {
  const handleDeleteBlog = (event) => {
    event.preventDefault();
    const shouldDelete = window.confirm(
      `Delete ${blog.title} by ${blog.author}`
    );
    shouldDelete && deleteBlog();
  };

  return (
    <StyledBlog className="blog">
      <BlogLink to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </BlogLink>
      <Button onClick={(event) => handleDeleteBlog(event)}>Delete</Button>
    </StyledBlog>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
