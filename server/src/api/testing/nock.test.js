const nock = require('nock');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET recipes', () => {
  let server, authStub;
  // si escribimos el before y el aftereach nos devuelve en el test " TypeError: authStub.restore is not a function"
  // y TypeError: app.address is not a function
  before(() => {
    authStub = sinon
      .stub(server, 'isAuthenticated')
      .callsFake(function (req, res, next) {
        return next();
      });
    server = require('../../index');
  });

  afterEach(() => {
    nock.cleanAll();
    authStub.restore();
  });

  it('should return all recipes', async () => {
    nock('http://localhost:3000')
      .get('/api/recipes')
      .reply(201, { data: 'Recovered all recipes' });

    const result = await chai
      .request(server)
      .get('http://localhost:3000/api/recipes');

    expect(result.status).to.equal(201);
    expect(result.body).to.deep.equal({ data: 'Recovered all recipes' });
  });
});

describe('register user', () => {
  it('should return username', async () => {
    nock('http://localhost:3000')
      .post('/api/users/register', {
        nickname: 'user1',
        email: 'user1@fjio.com',
        password: 'user1',
        role: 'basic',
        fullname: 'User Uno',
        diet: 'vegetarian',
        status: 'low',
        target: 'lose weight',
      })
      .reply(201, 'user register');

    const result = await chai
      .request(server)
      .get('http://localhost:3000/api/users/register');

    expect(result.status).to.equal(201);
    expect(result.body).to.deep.equal({ data: 'Recovered all recipes' });
  });
});
