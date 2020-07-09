import React from 'react';
import styled from 'styled-components';

const UserContainer = styled.div`
  text-align: center;
  font-size: 2rem;
`;

const Username = styled.h1`
  color: #dec79b;
  font-size: 3rem;
`;

const BlogList = styled.ul`
  list-style-type: none;
`;

const User = ({ user }) => (
  <UserContainer>
    <Username>{user.name || user.username}</Username>
    <h2>Blogs</h2>
    {user.blogs.length > 0 ? (
      <BlogList>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </BlogList>
    ) : (
      <h3>This user has not created a blog.</h3>
    )}
  </UserContainer>
);

export default User;
