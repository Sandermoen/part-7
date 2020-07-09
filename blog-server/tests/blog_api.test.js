const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/Blog');
const User = require('../models/User');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const user = await api
    .post('/api/users')
    .send(helper.initialUser)
    .expect(201);

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user.body.id })
  );
  const promiseArray = blogObjects.map((note) => note.save());
  await Promise.all(promiseArray);
});

test('returns correct amount of blogs in JSON format', async () => {
  expect.assertions(1);
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test('unique blog post identifier is named `id`', async () => {
  expect.assertions(1);
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(response.body[0].id).toBeDefined();
});

test('handles creating blog posts correctly', async () => {
  expect.assertions(2);
  const user = await api
    .post('/api/login')
    .send(helper.initialUser)
    .expect(200)
    .expect('Content-Type', /json/);

  const newPost = {
    title: 'Bug squishing 101',
    author: 'Robert C. Martin',
    url:
      'https://vignette.wikia.nocookie.net/insect/images/d/d0/Bug_1.png/revision/latest/scale-to-width-down/340?cb=20170618224705',
    likes: 1,
    user: user.body.id,
  };

  const {
    body: { id, ...rest },
  } = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newPost)
    .expect(201);
  const blogs = await helper.retrieveBlogs();
  expect(rest).toEqual(newPost);
  expect(blogs.length).toBe(helper.initialBlogs.length + 1);
});

test('defaults `likes` to 0 if not included in request', async () => {
  expect.assertions(1);
  const user = await api
    .post('/api/login')
    .send(helper.initialUser)
    .expect(200)
    .expect('Content-Type', /json/);

  const newPost = {
    title: 'Bug squishing 101',
    author: 'Robert C. Martin',
    url:
      'https://vignette.wikia.nocookie.net/insect/images/d/d0/Bug_1.png/revision/latest/scale-to-width-down/340?cb=20170618224705',
  };
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newPost)
    .expect(201);
  expect(response.body.likes).toBe(0);
});

test('server responds with status code 400 if the `title` and `url` properties are missing', async () => {
  const newPost = {
    author: 'Robert C. Martin',
  };
  await api.post('/api/blogs').send(newPost).expect(400);
});

test('handles deleting a blog post correctly', async () => {
  expect.assertions(1);
  let posts = await helper.retrieveBlogs();
  const user = await api
    .post('/api/login')
    .send(helper.initialUser)
    .expect(200)
    .expect('Content-Type', /json/);

  await api
    .delete(`/api/blogs/${posts[0].id}`)
    .set('Authorization', `bearer ${user.body.token}`)
    .expect(204);
  posts = await helper.retrieveBlogs();
  expect(posts.length).toBe(helper.initialBlogs.length - 1);
});

test('handles updating a blog post correctly', async () => {
  expect.assertions(2);
  const posts = await helper.retrieveBlogs();
  const update = {
    title: 'Testing is tedious but worth it',
    likes: 100,
  };
  const response = await api
    .put(`/api/blogs/${posts[0].id}`)
    .send(update)
    .expect(200);

  expect(response.body.title).toBe(update.title);
  expect(response.body.likes).toBe(update.likes);
});

test('adding a blog fails with status code 401 if no authorization token is provided', async () => {
  const newPost = {
    title: 'Bug squishing 101',
    author: 'Robert C. Martin',
    url:
      'https://vignette.wikia.nocookie.net/insect/images/d/d0/Bug_1.png/revision/latest/scale-to-width-down/340?cb=20170618224705',
    likes: 1,
  };

  await api.post('/api/blogs').send(newPost).expect(401);
});
