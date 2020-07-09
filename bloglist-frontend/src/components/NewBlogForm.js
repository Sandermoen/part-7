import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from './Input';
import Button from './Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: baseline;

  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    createBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Form onSubmit={(event) => handleCreateNewBlog(event)}>
      <Input
        id="title"
        type="text"
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />
      <Input
        id="author"
        type="text"
        placeholder="Author"
        onChange={(event) => setAuthor(event.target.value)}
        value={author}
      />
      <Input
        id="url"
        type="text"
        placeholder="Url"
        onChange={(event) => setUrl(event.target.value)}
        value={url}
      />
      <Button inverted id="create-blog-button" type="submit">
        Create
      </Button>
    </Form>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
