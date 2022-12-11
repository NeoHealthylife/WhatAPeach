import React, { useContext } from "react";
import { BsGoogle } from "react-icons/bs";
import CardComp from "../../components/Card";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import UiButton from "../../components/UIComponents/UIButton";
import UIInput from "../../components/UIComponents/UIInput";
import UISelect from "../../components/UIComponents/UISelect";
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
              <UIInput
                label="Nombre del usuario"
                placeholder="Introduce un nombre válido"
                helpText="Aquí va el nombre de usuario"
                name="nickname"
                validations={{
                  required: "Esto es requerido",
                  minLength: {
                    value: 2,
                    message: "Necesita un minimo de 2 caracteres",
                  },
                }}
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
