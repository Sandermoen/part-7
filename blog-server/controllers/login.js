const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });
  const correctPassword = !user
    ? false
    : await bcrypt.compare(body.password, user.password);

  if (!(user && correctPassword)) {
    return res.status(401).send({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);
  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id });
});

module.exports = loginRouter;
