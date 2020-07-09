describe('Blog app', function () {
  const username = 'test';
  const name = 'test user';
  const password = 'password';
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username,
      name,
      password,
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('Succeeds with correct login credentials', function () {
      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('#submit-button').click();
      cy.contains(`${username} logged in`);
    });

    it('Fails with wrong login credentials', function () {
      cy.get('#username').type('randomuser');
      cy.get('#password').type('wrongpassword');
      cy.get('#submit-button').click();
      cy.contains('Invalid username or password');
      cy.get('.notification').should(
        'have.css',
        'background-color',
        'rgb(209, 66, 66)'
      );
    });
  });

  describe.only('When logged in', function () {
    const blogTitle = 'e2e testing, a comprehensive guide';
    const blogAuthor = 'fullstackopen';
    const blogUrl = 'www.fullstackopen.com';
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username,
        password,
      }).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function () {
      cy.contains('New blog').click();
      cy.get('#title').type(blogTitle);
      cy.get('#author').type(blogAuthor);
      cy.get('#url').type(blogUrl);
      cy.get('#create-blog-button').click();
      cy.get('.blog').contains(`${blogTitle}`);
    });

    describe('Blog functions', function () {
      let token;
      beforeEach(function () {
        token = JSON.parse(localStorage.getItem('user')).token;
        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,
          },
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        cy.reload();
      });

      it('A blog can be liked', function () {
        cy.contains('View').click();
        cy.contains('like').click();
        cy.contains('likes 1');
      });

      it('A blog can be deleted', function () {
        cy.contains('View').click();
        cy.contains('Delete').click();
        cy.get('.blog').should('not.exist');
      });

      it('Blogs are ordered by likes in descending order', function () {
        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: {
            title: 'most liked',
            author: 'super cool dude',
            url: 'www.mostliked.com',
            likes: 40,
          },
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: {
            title: 'worst post',
            author: 'not so cool guy',
            url: 'www.nobodylikesme.com',
          },
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        cy.reload();
        cy.get('.blog').first().contains('most liked');
      });
    });
  });
});
