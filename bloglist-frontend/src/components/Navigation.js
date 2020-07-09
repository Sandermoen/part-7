import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';

const Header = styled.header`
  padding: 2rem 0;
  color: white;
  font-size: 2rem;
  margin-bottom: 5rem;
`;

const NavLinkList = styled.ul`
  & > * {
    display: inline-block;
  }

  & > *:not(:last-child) {
    margin-right: 2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const UserInformation = styled.aside`
  display: flex;
  margin-left: auto;
  align-items: center;
  color: #dec79b;

  & > :not(:last-child) {
    margin-right: 2rem;
  }
`;

const Link = styled(NavLink)`
  color: currentColor;
  text-decoration: none;
  padding-bottom: 5px;

  &.active {
    border-bottom: 2px solid #dec79b;
  }
`;

const Navigation = ({ user, logout }) => (
  <Header>
    <Nav>
      <NavLinkList>
        <li>
          <Link exact to="/">
            Blogs
          </Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </NavLinkList>
      {user && (
        <UserInformation>
          <h3>{user.name || user.username}</h3>
          <Button onClick={logout}>Logout</Button>
        </UserInformation>
      )}
    </Nav>
  </Header>
);

export default Navigation;
