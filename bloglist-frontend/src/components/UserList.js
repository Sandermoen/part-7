import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';

import User from './User';

import usersService from '../services/users';

const UserListContainer = styled.div`
  text-align: center;
`;

const Table = styled.table`
  text-align: left;
`;

const Tr = styled.tr`
  font-size: 2rem;
  margin-right: 4rem;

  & > * {
    padding: 0 5rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
`;

const StyledLink = styled(Link)`
  color: #dec79b;
  text-decoration: none;
`;

const UserList = () => {
  const { url } = useRouteMatch();
  const match = useRouteMatch('/users/:id');
  const [users, setUsers] = useState([]);
  const user = match ? users.find((user) => user.id === match.params.id) : null;
  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <Switch>
      <Route exact path={url}>
        <UserListContainer>
          <Title>Users</Title>
          <Table>
            <thead>
              <Tr>
                <th>Name</th>
                <th>Blogs</th>
              </Tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <td>
                    <StyledLink to={`${url}/${user.id}`}>
                      {user.name || user.username}
                    </StyledLink>
                  </td>
                  <td>
                    <b>{user.blogs.length}</b>
                  </td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </UserListContainer>
      </Route>
      <Route path={`${url}/:id`}>{user && <User user={user} />}</Route>
    </Switch>
  );
};

export default UserList;
