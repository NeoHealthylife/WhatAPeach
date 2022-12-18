import { createContext, useState } from "react";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [interruptor, setInterruptor] = useState(false);
  const [homeContent, setHomeContent] = useState("intro");

  const [item, setItem] = useState(() => {
    const localItem = sessionStorage.getItem("item");
    const initialValue = JSON.parse(localItem);
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
  //IsLogged no funcionaba y el dashboard no se pintaba en home porque el UseState estaba seteado en false
  const [isLogged, setIsLogged] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const initialValue = JSON.parse(savedUser);

    return user || initialValue;
  });

  const logout = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
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
    item,
    setItem,
    logout,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContextProvider };
export default GlobalContext;
