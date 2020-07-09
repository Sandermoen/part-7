import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: #666681;
  color: #dec79b;
  padding: 1.5rem 1rem;
  width: 25rem;

  &::placeholder {
    color: #18181e;
  }
`;

const Input = (props) => <StyledInput {...props} />;

export default Input;
