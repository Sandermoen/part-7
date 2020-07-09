import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: inherit;
  padding: 1.5rem 2rem;
  outline: none;
  border: 1px solid ${(props) => (props.inverted ? 'transparent' : '#a1a1a1')};
  background: ${(props) => (props.inverted ? '#dec79b' : 'transparent')};
  color: ${(props) => (props.inverted ? 'white' : '#dec79b')};
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 200ms ease-out;

  &:hover {
    color: ${(props) => (props.inverted ? '#dec79b' : 'white')};
    background-color: ${(props) =>
      props.inverted ? 'transparent' : '#dec79b'};
    border: 1px solid ${(props) => (props.inverted ? '#a1a1a1' : 'transparent')};
  }
`;

const Button = ({ inverted, children, ...props }) => (
  <StyledButton inverted={inverted} {...props}>
    {children}
  </StyledButton>
);

export default Button;
