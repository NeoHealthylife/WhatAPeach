import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
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
              <h3>ALGUNAS PALABRAS DE BIENVENIDA</h3>
              <p>
                un parrafo con algunas palabras y debajo habrá botones de login o registro
              </p>
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
