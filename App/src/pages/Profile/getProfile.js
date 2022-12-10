const getProfile = async () => {
  try {
    const data = await fetch(`http://localhost:3000/api/users/638cfdd4b6d00aad22fd2b6c`);
    const res = await data.json();
    console.log("data", data);
    return res;
  } catch (error) {
    return Error(error);
  }
};

const Error = (error) => `<p>Error:${error}</p>`;

export default getProfile;
