import React, { useContext } from "react";
import { BsGoogle } from "react-icons/bs";
import CardComp from "../../components/Card";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import UiButton from "../../components/UIComponents/UIButton";
import UIInput from "../../components/UIComponents/UIInput";
import GlobalContext from "../../context/GlobalContext";
import Dashboard from "../Dashboard/Dashboard";
import RegisterForm from "../Register/RegisterWForm";

const Home = () => {
  const { isLogged } = useContext(GlobalContext);

  const exampleOptions = [
    { value: "fruta", label: "Fruta" },
    { value: "hidratos", label: "Hidratos" },
    { value: "carnes", label: "Carnes" },
  ];

  const filtrar = () => {};

  return (
    //meter layout de la pagina creado con styled
    <LayoutWrapper>
      <div className="HomeDiv">
        {!isLogged && (
          <>
            <div>
              <RegisterForm/>
              
    
            </div>
          </>
        )}
        {isLogged && <Dashboard />}
      </div>
    </LayoutWrapper>
  );
};

export default Home;
