import { Heading } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";

const TextAbout = styled.div`
  padding: 70px;
`;

const About = () => {
  return (
    <div>
      <LayoutWrapper>
        <Heading ml="100px" padding="30px" fontFamily="pacifico" color="#FE9066">
          Como surgió What a Peach? 🍑
        </Heading>
        <TextAbout>
          <h2>
            What a peach es una aplicación enfocada a toda persona que quiera cambiar su
            estilo de vida pero le suponga un problema por falta de motivación o ideas.
            <br></br>
            Con esta aplicación podrás descubrir recetas sanas y rutinas de ejercicios
            acordes a tu estado físico inicial y gestionarlas como desees para así
            implementar tu nuevo estilo de vida progresivamente y de forma divertida
            gracias a los retos semanales. <br></br>En el futuro los usuarios podrán
            postear sus retos en la aplicación y votar entre ellos el reto más original,
            más elaborado…etc.
          </h2>
        </TextAbout>
        <Heading ml="100px" padding="30px" fontFamily="pacifico" color="#FE9066">
          Nuestro equipo:
        </Heading>
        <TextAbout>
          Bienvenido Peacher! Nos presentamos: Somos un equipo de tres desarrolladores
          junior los que hemos dado vida a esta aplicación tan divertida y fácil de usar.
          <div>
            María Sosa Luna // Junior Full-stack Developer. Amante del Crossfit y fan de
            la dieta vegetariana.
          </div>
          <div>Gloria Junior // Full-stack Developer</div>
          <div> Álvaro Junior // Full-stack Developer</div>
        </TextAbout>
      </LayoutWrapper>
    </div>
  );
};

export default About;
