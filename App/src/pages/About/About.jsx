import { Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";

const TextAbout = styled.div`
  padding: 70px;
  text-align: justify;
`;

const About = () => {
  return (
    <div>
      <LayoutWrapper>
        <Heading ml="100px" pb="30px" fontFamily="pacifico" color="#FE9066">
          Como surge What a Peach? 🍑
        </Heading>
        <TextAbout>
          <Text variant="H3">
            What a Peach! es una aplicación enfocada tanto para alguien que quiera cambiar
            su estilo de vida para tener unos hábitos más saludables como para aquella
            persona cuyo estilo de vida ya lo sea. Aquellos usuarios a los que le suponga
            un problema por falta de motivación o ideas podrán acceder a un contenido
            personalizado y actualizado, y aquellos usuarios experiemntados en el arte de
            cocinar y más deportistas podrán igualmente retarse con nuevos desafíos, ya
            sea en los fogones o en el gym.
          </Text>
          <Text variant="H3" mt="15px">
            Gestiona tus desafíos, guárdalos y ponte a prueba a ti mismo con cada reto
            semanal ¡Únete a nuestra comunidad de una vida más saludable, únete a What a
            Peach!
          </Text>
        </TextAbout>
        <Heading ml="100px" padding="30px" fontFamily="pacifico" color="#FE9066">
          El Equipo:
        </Heading>
        <TextAbout>
          Bienvenido Peacher! Somos un equipo conformado por tres desarrolladores que
          hemos dado vida a esta aplicación web.
          <Text variant="H3" m="30px" display="flex">
            <Link color="primary" href="https://github.com/mariasosaluna" mr="5px">
              María Sosa Luna
            </Link>
            // Junior Full-stack Developer. Amante del Crossfit y fan de la dieta
            vegetariana.
          </Text>
          <Text variant="H3" m="30px" display="flex">
            <Link color="primary" href="https://github.com/gloria-eme" mr="5px">
              Gloria Merín{" "}
            </Link>
            // Junior Full-stack Developer
          </Text>
          <Text variant="H3" m="30px" display="flex">
            <Link color="primary" href="https://github.com/alvaroLZ96" mr="5px">
              {" "}
              Álvaro López Zarraute
            </Link>
            // Junior Full-stack Developer
          </Text>
        </TextAbout>
      </LayoutWrapper>
    </div>
  );
};

export default About;
