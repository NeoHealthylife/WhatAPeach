import React, { useContext } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import GlobalContext from "../../context/GlobalContext";
import Dashboard from "../Dashboard/Dashboard";

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
      <div className="HomeDiv">{isLogged && <Dashboard />}</div>
    </LayoutWrapper>
  );
};

export default Home;
