import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from './Input';
import Button from './Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    login(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <Form onSubmit={(event) => handleLogin(event)}>
      <h1>Login</h1>
      <Input
        id="username"
        type="text"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        placeholder="Username"
      />

      <Input
        id="password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        placeholder="Password"
      />

      <Button id="submit-button" type="submit">
        login
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
