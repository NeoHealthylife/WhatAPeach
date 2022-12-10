import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CardComp from "../../components/Card";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import UiButton from "../../components/UIComponents/UIButton";
import { BsGoogle } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";
import Dashboard from "../Dashboard/Dashboard";
import UIInput from "../../components/UIComponents/UIInput";
import UISelect from "../../components/UIComponents/UISelect";

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
              <UISelect
                options={exampleOptions}
                label="Ejemplo de select"
                placeholder="Selecciona nutriente"
                onChange={(e) => filtrar()}
                isError=""
              />
              <UiButton variant="primary">Hoeeeeeeeeela</UiButton>
              <UiButton variant="secondary">
                <BsGoogle />
                Hoeeeeeeeeee
              </UiButton>

              <CardComp />

              <UIInput
                label="Nombre del usuario"
                placeholder="Introduce un nombre válido"
                helpText="Aquí va el nombre de usuario"
              />
            </div>
          </>
        )}
        {isLogged && <Dashboard />}
      </div>
    </LayoutWrapper>
  );
};

export default Home;
