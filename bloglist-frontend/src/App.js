import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import UserList from './components/UserList';
import BlogList from './components/BlogList';
import BlogContent from './components/BlogContent';
import Navigation from './components/Navigation';

import blogsActions from './redux/blogs/blogsActions';
import userActions from './redux/user/userActions';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }
  
  body {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    line-height: 1.7;
    color: white;
    box-sizing: border-box;
    min-height: 100vh;
    background-color: #18181E;
    padding: 0 30rem;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: space-around;
  position: relative;
`;

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const match = useRouteMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      dispatch(userActions.setUser(user));
    }
    dispatch(blogsActions.getAllBlogs());
  }, [dispatch]);

  return (
    <Fragment>
      <GlobalStyle />
      <Navigation user={user} logout={() => dispatch(userActions.logout())} />
      {notification.show && (
        <Notification error={notification.error}>
          {notification.message}
        </Notification>
      )}
      <Main>
        <Switch>
          <Route exact path="/">
            {user ? (
              <BlogList />
            ) : (
              <LoginForm
                login={(username, password) =>
                  dispatch(userActions.login(username, password))
                }
              />
            )}
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/blogs/:id">
            {blog && (
              <BlogContent
                likeBlog={(blog) => dispatch(blogsActions.likeBlog(blog))}
                addComment={(id, message) =>
                  dispatch(blogsActions.addComment(id, message))
                }
                blog={blog}
              />
            )}
          </Route>
        </Switch>
      </Main>
    </Fragment>
  );
};

export default App;
