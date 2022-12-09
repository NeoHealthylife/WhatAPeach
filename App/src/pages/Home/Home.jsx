import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CardComp from "../../components/Card";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";

import GlobalContext from "../../context/GlobalContext";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  const { isLogged } = useContext(GlobalContext);
  return (
    //meter layout de la pagina creado con styled
    <LayoutWrapper>
      <div className="HomeDiv">
        {!isLogged && (
          <>
            <div>
              <CardComp/>
            </div>
            <div className="HomeBtns">
              <NavLink to="register">Registrarse</NavLink>
              <NavLink to="login">Log in</NavLink>
            </div>
          </>
        )}
        {isLogged && <Dashboard />}
      </div>
    </LayoutWrapper>
  );
};

export default Home;
