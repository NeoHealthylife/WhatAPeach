import React, { useContext } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import GlobalContext from "../../context/GlobalContext";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  const { isLogged } = useContext(GlobalContext);

  /* const filtrar = () => {};*/

  return (
    <LayoutWrapper>
      <div className="HomeDiv">{isLogged && <Dashboard />}</div>
    </LayoutWrapper>
  );
};

export default Home;
