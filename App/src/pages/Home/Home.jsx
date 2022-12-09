import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import UiButton from "../../components/UIComponents/UIButton";
import {BsGoogle} from "react-icons/bs";
import CardComp from "../../components/Card";
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
              <UiButton variant="primary" >Hoeeeeeeeeeeeeeeeeeeeeeeeeeeeela</UiButton>
              <UiButton variant="secondary" >
              <BsGoogle/>Hoeeeeeeeeeeeeee</UiButton>
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
