import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const toast = useToast();

  const [homeContent, setHomeContent] = useState("intro");

  const [activePage, setActivePage] = useState("");

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

  const showToast = (type, message) => {
    toast({
      position: "top",
      title: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  const value = {
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
    showToast,
    activePage,
    setActivePage,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContextProvider };
export default GlobalContext;
