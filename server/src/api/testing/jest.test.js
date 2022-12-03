const axios = require('axios');

//RECIPES TESTS
const getFirstRecipeName = async () => {
  const response = await axios.get('https://localhost:8080/api');
  return response.recipes[0].title;
};

const postRecipe = async () => {
  const response = await axios.post('https://localhost:8080/api');
  return response;
};

/* const getFirstPaintingName = require('./index');
const axios = require('axios'); */

jest.mock('axios');

test('returns the name of the first painting', async () => {
  axios.get.mockResolvedValue({
    recipes: [
      {
        title: 'Lentejas a la riojana',
        time: 90,
        ingredients: [
          'lentejas',
          'chorizo',
          'zanahoria',
          'patata',
          'laurel',
          'cebolla',
        ],
        image: 'lentejas.jpg',
        description: 'las lentejas son un plato típico español',
        recipe: [
          'poner a hervir agua',
          'echar las lentejas al agua',
          'hervir las verduras',
        ],
        tags: ['legumbres', 'lentejas', 'healthy'],
      },
      {
        title: 'Garbanzos con tomate',
        time: 80,
        ingredients: ['garbanzos', 'chorizo', 'tomate', 'cebolla'],
        image: 'garbanzos.jpg',
        description: 'los garbanzos son un plato típico español',
        recipe: [
          'poner a hervir agua',
          'echar los garbanzos al agua',
          'hervir las verduras',
        ],
        tags: ['legumbres', 'garbanzos', 'healthy'],
      },
    ],
  });

  const title = await getFirstRecipeName();
  expect(title).toEqual('Lentejas a la riojana');
});

test('post a new painting FAIL', async () => {
  axios.post.mockResolvedValue({
    recipes: [
      {
        title: 'Garbanzos con tomate',
        time: 80,
      },
    ],
    status: [
      {
        status: 500,
        message: 'some required fields for the request are empty',
      },
    ],
  });

  const response = await postRecipe();
  expect(response.status[0].status).toEqual(500);
  expect(response.status[0].message).toEqual(
    'some required fields for the request are empty'
  );
});

//WORKOUT TESTS

const getWorkouts = async () => {
  const response = await axios.get('https://localhost:8080/api');
  return response;
};

const postNewWorkout = async () => {
  const response = await axios.post('https://localhost:8080/api');
  return response;
};

jest.mock('axios');

test('return the number of items', async () => {
  axios.get.mockResolvedValue({
    workouts: [
      {
        title: 'rodillas al pecho',
        time: 60,
        imageCard: 'imagen1.jpg',
        imageBeginning: 'imagen2.jpg',
        equipment: true,
        description: 'ejercicio anaeróbico',
        workout: ['lleva las rodillas lo más arriba posible y a tope de powah'],
      },
    ],
  });

  const response = await getWorkouts();
  expect(response.workouts).toHaveLength(1);
});

test('the new post is succesful ', async () => {
  axios.post.mockResolvedValue({
    workouts: [
      {
        title: 'rodillas al pecho',
        time: 60,
        imageCard: 'imagen1.jpg',
        imageBeginning: 'imagen2.jpg',
        equipment: true,
        description: 'ejercicio anaeróbico',
        workout: ['lleva las rodillas lo más arriba posible y a tope de powah'],
      },
    ],
  });

  const response = await postNewWorkout();
  expect(response.workouts).toEqual(expect.anything());
  expect(response.workouts[0]).toEqual(expect.objectContaining({ time: 60 }));
});

//USERS TESTS
