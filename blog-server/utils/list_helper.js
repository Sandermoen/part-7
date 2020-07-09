const _ = require('lodash');

const dummy = () => {
  return 1;
};

const sumOfLikes = (blogs) => {
  return blogs.reduce((acc, currentValue) => acc + currentValue.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return false;
  }
  return blogs.reduce((acc, currentValue) => {
    if (currentValue.likes > acc.likes) {
      return currentValue;
    }
    return acc;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return false;
  }
  const list = _.countBy(blogs, 'author');
  let mostBlogs = {};
  for (const author in list) {
    if (list[author] > mostBlogs.blogs || !mostBlogs.blogs) {
      mostBlogs = { author, blogs: list[author] };
    }
  }
  return mostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return false;
  }
  const mostLiked = _.maxBy(blogs, 'likes');
  const totalLikes = blogs.reduce((acc, currentValue) => {
    if (currentValue.author === mostLiked.author) {
      return acc + currentValue.likes;
    }
    return acc;
  }, 0);
  return { author: mostLiked.author, likes: totalLikes };
};

module.exports = {
  dummy,
  sumOfLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
