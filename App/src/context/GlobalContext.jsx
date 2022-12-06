import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [interruptor, setInterruptor] = useState(false);

  const value = {
    interruptor,
    setInterruptor,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContextProvider };
export default GlobalContext;
