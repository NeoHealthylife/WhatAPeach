const nock = require('nock');
//opción 1
it('can get todos', async () => {
  const todoObject = {
    todos: [
      { task: 'Two', _id: 9, completed: false },
      { task: 'three', _id: 84, completed: false },
    ],
  };
  nock('https://todo-app-barkend.herokuapp.com/todos/')
    .get('/')
    .reply(200, todoObject);
  const res = await got('https://todo-app-barkend.herokuapp.com/todos/');
  expect(res.body).to.eq(JSON.stringify(todoObject));
  expect(res.statusCode).to.equal(200);
});

//opción 2
const getData = async () => {
  const res = await axios.get('https://api.example.com');

  const data = res.data;
  return data;
};

describe('expectedData', () => {
  it('checks if API returns expected data', async () => {
    nock('https://api.example.com')
      .get('/')
      .reply(200, {
        data: {
          id: 1,
          title: 'The weather is nice',
          completed: true,
        },
      });
    const results = await getData();
    expect(results.data.title).toEqual('The weather is nice');
  });
});
//opción 3
const scope = nock('http://api.example.com')
  .delete('/users/1')
  .reply(200)
  .get('/users/1')
  .reply(404)
  .post('/users', {
    username: 'user',
    email: 'user@email.com',
  })
  .reply(200, 'user created')
  .get('/users')
  .reply(200, {
    _id: '1',
    username: 'user',
    email: 'user@email.com',
  });
//opción 4:error
it('should return a default user on 500', () => {
  nock(/randomuser/)
    .get(/api/)
    .reply(500);
  return query
    .getRandomUserGuarded()
    .then((res) => expect(res).toMatchObject(defaultUser));
});
//headers
const scope = nock('http://api.example.com', {
  reqheaders: {
    authorization: 'Basic Auth',
    'Content-Type': 'application/json',
  },
})
  .get('')
  .reply(200);

// "test": "jest --runInBand --detectOpenHandles --forceExit",
//"test:watch": "npm run test -- --watch"
