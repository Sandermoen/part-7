import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {
  let component;
  let createBlog = jest.fn();
  beforeEach(() => {
    component = render(<NewBlogForm createBlog={createBlog} />);
  });

  afterEach(() => {
    createBlog.mockReset();
  });

  test('calls createBlog with the correct details', () => {
    const title = 'test title, hello there!';
    const author = 'me';
    const url = 'www.me.com';
    const titleInput = component.container.querySelector('#title');
    const authorInput = component.container.querySelector('#author');
    const urlInput = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, {
      target: { value: title },
    });
    fireEvent.change(authorInput, { target: { value: author } });
    fireEvent.change(urlInput, { target: { value: url } });
    fireEvent.submit(form);

    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith(title, author, url);
  });
});
