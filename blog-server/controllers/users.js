const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    return res
      .status(400)
      .send({ error: 'Password must be at least 3 characters.' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  const userDocument = await user.save();
  res.status(201).json(userDocument);
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', 'url title author');
  res.json(users);
});

module.exports = usersRouter;
