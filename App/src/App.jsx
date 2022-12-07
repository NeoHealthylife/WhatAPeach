
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import FaceButton from './components/FacebookButton';
import GoogleButton from './components/GoogleButton';

function App() {
  return (
    <div className="App">
      <FaceButton />
      <GoogleButton />
    </div>
  );

}

export default App;
