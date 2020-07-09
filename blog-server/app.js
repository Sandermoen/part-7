const mongoose = require('mongoose');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const app = express();
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing');

logger.info('Connecting to', config.MONGO_URI);
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to database');
  })
  .catch((err) => logger.error('Error connecting to database:', err.message));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/testing', testingRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
