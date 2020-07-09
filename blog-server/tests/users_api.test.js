const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const User = require('../models/User');

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User({
    username: 'test',
    name: 'test user',
    password: 'test',
  });
  await user.save();
});

test('invalid users are not created', async () => {
  expect.assertions(1);
  const previousUsers = await User.find({});
  await api
    .post('/api/users')
    .send({ username: 'he', name: 'test', password: 'e' })
    .expect(400)
    .expect('Content-Type', /json/);
  const newUsers = await User.find({});
  expect(newUsers.length).toBe(previousUsers.length);
});

test('adding a user with a too short username returns the correct error code and message', async () => {
  expect.assertions(1);
  const invalidUser = { username: '3', name: 'test', password: 'hello' };
  const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)
    .expect('Content-Type', /json/);
  expect(response.body.error).toContain(
    'Path `username` (`3`) is shorter than the minimum allowed length'
  );
});

test('adding a user with a nonunique username returns the correct error code and message', async () => {
  expect.assertions(1);
  const users = await User.find({});
  const invalidUser = {
    username: users[0].username,
    name: 'test',
    password: 'test',
  };
  const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)
    .expect('Content-Type', /json/);
  expect(response.body.error).toContain('`username` to be unique');
});

test('adding a user with a too short password returns the correct error code and message', async () => {
  expect.assertions(1);
  const invalidUser = {
    username: 'testing',
    name: 'test',
    password: 't',
  };
  const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)
    .expect('Content-Type', /json/);
  expect(response.body.error).toContain('Password must be at least');
});
