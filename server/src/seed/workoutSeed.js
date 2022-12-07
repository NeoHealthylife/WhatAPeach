// Archivo character.seed.js

const mongoose = require('mongoose');

// Imporatmos el modelo Pet en este nuevo archivo.
const model = require('../api/workout/model');

const characters = [
  {
    name: 'Ursula Corberó',
    age: 32,
    alias: 'Tokio',
  },
  {
    name: 'Pedro Alonso',
    age: 50,
    alias: 'Berlín',
  },
  {
    name: 'Álvaro Morte',
    age: 46,
    alias: 'Profesor',
  },
  {
    name: 'Alba Flores',
    age: 34,
    alias: 'Nairobi',
  },
  {
    name: 'Jaime Lorente',
    age: 29,
    alias: 'Denver',
  },
  {
    name: 'Darko Peric',
    age: 44,
    alias: 'Helsinki',
  },
];
