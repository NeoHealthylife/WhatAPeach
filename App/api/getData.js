const getData = async (param) => {
    try {
      const data = await fetch(`http://localhost:3000/api/${param}`);
      const res = await data.json();
      return res;
    } catch (error) {
      return Error(error);
    }
  };
  
  const Error = (error) => `<p>Error:${error}</p>`;
  
  
  export default getData;