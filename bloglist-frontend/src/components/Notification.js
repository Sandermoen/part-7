import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import FontAwesome from 'react-fontawesome';

const popIn = keyframes`
  0% {
    transform: translateY(-10rem)
  }
  100% {
    transform: translateY(0)
  }
`;

const NotificationContainer = styled.div`
  position: absolute;
  top: 3rem;
  right: 3rem;
  display: flex;
  align-items: center;
  background-color: #212131;
  border-left: 3px solid ${(props) => (props.error ? '#bf3f3f' : '#52cc52')};
  padding: 1rem 2rem;
  min-width: 25rem;
  z-index: 10;
  box-shadow: 0 5px 20px black;
  border-radius: 2px;
  transform: translateY(0);
  animation: ${popIn} 300ms ease-out forwards;

  & > :first-child {
    margin-right: 1.5rem;
  }
`;

const Icon = styled(FontAwesome)`
  color: ${(props) => (props.error ? '#bf3f3f' : '#52cc52')};
  font-size: 2.5rem;
`;

const Message = styled.h3`
  font-size: 1.3rem;
  font-weight: 400;
`;

const Notification = ({ error, children }) => (
  <NotificationContainer error={error} className="notification">
    <div>
      <Icon
        error={error}
        name={error ? 'fas fa-times-circle' : 'fas fa-check-circle'}
      />
    </div>
    <div>
      <h2>{error ? 'Error' : 'Success'}</h2>
      <Message>{children}</Message>
    </div>
  </NotificationContainer>
);

Notification.propTypes = {
  error: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Notification;
