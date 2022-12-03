import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import FaceButton from './components/FacebookButton';
import GoogleButton from './components/GoogleButton';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FaceButton />
      <GoogleButton />
    </div>
  );
}

export default App;
