import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  let likeBlog = jest.fn();
  const initialBlog = {
    likes: 0,
    title: 'this should work',
    author: 'by me',
    url: 'thisshouldwork.com',
    user: { username: 'testuserman', id: '5eff29749ad8d812aa72ff24' },
    id: '5f005e25d42e3e00fa999906',
  };
  beforeEach(() => {
    component = render(
      <Blog blog={initialBlog} likeBlog={likeBlog} deleteBlog={jest.fn} />
    );
  });

  afterEach(() => {
    likeBlog.mockReset();
  });

  test("initially only renders the blog's title and author", () => {
    expect(component.container).toHaveTextContent(
      `${initialBlog.title} ${initialBlog.author}`
    );
    expect(component.container.querySelector('.blog__content')).toBeNull();
  });

  test('url and number of likes is shown when button is clicked', () => {
    const button = component.getByText('View');
    fireEvent.click(button);
    const content = component.container.querySelector('.blog__content');
    expect(content).toHaveTextContent(initialBlog.url);
    expect(content).toHaveTextContent(initialBlog.likes);
  });

  test('the event handler for liking a blog is called the correct amount', () => {
    const viewButton = component.getByText('View');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(likeBlog).toHaveBeenCalledTimes(2);
  });
});
