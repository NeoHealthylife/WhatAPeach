import React from "react";
import { useContext } from "react";

import GlobalContext from "../../context/GlobalContext";

const Home = () => {
  const { homeContent, setHomeContent } = useContext(GlobalContext);
  return (
    //meter layout de la pagina creado con styled
    <div className="HomeDiv">
      {homeContent == "intro" ? (
        <>
          <div>
            <h3>ALGUNAS PALABRAS DE BIENVENIDA</h3>
            <p>
              un parrafo con algunas palabras y debajo habrá botones de login o registro
            </p>
          </div>
          <div className="HomeBtns">
            <button type="button" onClick={() => setHomeContent("register")}>
              Registrarse
            </button>
            <button type="button" onClick={() => setHomeContent("login")}>
              Iniciar Sesión
            </button>
          </div>
        </>
      ) : homeContent == "register" ? (
        //crear contenido de la página de registro con el botón de volver
        <button type="button" onClick={() => setHomeContent("intro")}>
          Volver
        </button>
      ) : homeContent == "login" ? (
        //crear contenido para página de login con el botón de volver
        <button type="button" onClick={() => setHomeContent("intro")}>
          Volver
        </button>
      ) : null}
    </div>
  );
};

export default Home;
