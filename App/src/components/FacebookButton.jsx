const FaceButton = () => {
  const handleFacebookClick = () => {
    window.location.href = "http://localhost:3000/api/users/auth/facebook";
  };

  return <button onClick={(e) => handleFacebookClick(e)}>facebook</button>;
};

export default FaceButton;
