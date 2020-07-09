import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import Input from './Input';

const BlogContentContainer = styled.article`
  text-align: center;
  font-size: 2rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  border-bottom: 2px solid #dec79b;
  margin-bottom: 2rem;
  display: inline-block;

  & > :not(:last-child) {
    margin-bottom: 5rem;
  }
`;

const StyledLink = styled.a`
  display: block;
  color: #dec79b;
  text-decoration: none;
  font-size: 2rem;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > :first-child {
    margin-right: 1rem;
  }
`;

const Highlight = styled.span`
  color: #dec79b;
`;

const CommentForm = styled.form`
  & > :first-child {
    margin-right: 1rem;
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  text-align: left;
  font-size: 1.5rem;
  background-color: #212131;
  border-left: 3px solid #dec79b;

  & > * {
    padding: 1rem 2rem;
    background-color: #212131;
  }

  & :nth-child(even) {
    background-color: #18181e;
  }
`;

const BlogContent = ({ blog, likeBlog, addComment }) => {
  const [comment, setComment] = useState('');
  const handleLikeBlog = (event) => {
    event.preventDefault();
    likeBlog({ ...blog, user: blog.user._id });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addComment(blog.id, comment);
    setComment('');
  };

  return (
    <BlogContentContainer>
      <Title>{blog.title}</Title>
      <StyledLink href={blog.url}>{blog.url}</StyledLink>
      <Likes>
        <p>Likes {blog.likes} </p>
        <Button onClick={(event) => handleLikeBlog(event)}>like</Button>
      </Likes>
      <p>
        Added by <Highlight>{blog.user.name || blog.user.username}</Highlight>
      </p>
      <h3>Comments</h3>
      <CommentForm onSubmit={(event) => handleSubmit(event)}>
        <Input
          type="text"
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          placeholder="Comment..."
        />
        <Button>Add comment</Button>
      </CommentForm>
      {blog.comments.length > 0 ? (
        <Ul>
          {blog.comments.map((comment) => (
            <li>{comment}</li>
          ))}
        </Ul>
      ) : (
        <h4>No comments yet.</h4>
      )}
    </BlogContentContainer>
  );
};

export default BlogContent;
