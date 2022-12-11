const getProfile = async () => {
    try {
      const data = await fetch(`http://localhost:3000/api/users/6388ed8479194aa01afffb9f`);
      const res = await data.json();
      return res;
    } catch (error) {
      return Error(error);
    }
  };
  
  const Error = (error) => `<p>Error:${error}</p>`;
  
  export default getProfile;

