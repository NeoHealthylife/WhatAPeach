import { createContext, useState } from "react";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [interruptor, setInterruptor] = useState(false);
  const [homeContent, setHomeContent] = useState("intro");
  const [isLogged, setIsLogged] = useState(false);

  const [ recipe, setRecipe ] = useState(() => {
    const localRecipe = sessionStorage.getItem("recipe");
    const initialValue = JSON.parse(localRecipe);
    return initialValue || null;
  });

  const [jwt, setJwt] = useState(() => {
    const savedJwt = localStorage.getItem("token");
    return savedJwt || null;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const initialValue = JSON.parse(savedUser);
    return initialValue || null;
  });

  const value = {
    interruptor,
    setInterruptor,
    homeContent,
    isLogged,
    setIsLogged,
    setHomeContent,
    jwt,
    setJwt,
    user,
    setUser,
    recipe,
    setRecipe

  };

 
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContextProvider };
export default GlobalContext;
