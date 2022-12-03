import axios from 'axios';

const GoogleButton = () => {
  const handleGoogleClick = () => {
    window.location.href =
      'http://localhost:3000/api/users/auth/google';
  };

  return (
    <button onClick={(e) => handleGoogleClick(e)}>google</button>
  );
};

export default GoogleButton;
