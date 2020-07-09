const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', 'username name');
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const post = req.body;
  if (!post.title && !post.url) {
    return res.status(400).send({ error: 'Title and url missing.' });
  }
  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).send({ error: 'Token missing or invalid' });
  }
  const user = await User.findOne({ _id: decodedToken.id });
  const blog = new Blog({ ...req.body, user: user._id });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  res.status(201).json(result);
});

blogRouter.post('/:id/comments', async (req, res) => {
  const { message } = req.body;
  const { id } = req.params;
  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).send({ error: 'Token missing or invalid' });
  }

  await Blog.findByIdAndUpdate(id, {
    $push: { comments: message },
  });

  res.status(201).end();
});

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).send({ error: 'Token missing or invalid' });
  }
  const blog = await Blog.findById(id);
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return res.status(401).send({ error: 'Not authorized' });
  }
  await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

blogRouter.put('/:id', async (req, res) => {
  const update = req.body;
  const { id } = req.params;
  const updatedPost = await Blog.findByIdAndUpdate(id, update, { new: true });
  res.json(updatedPost);
});

module.exports = blogRouter;
