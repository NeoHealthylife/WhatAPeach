import React from "react";
import styled from "styled-components";
import Footer from "../ChakraComponents/Footer";

const StyledContent = styled.div`
  background: linear-gradient(90.08deg, #f4967f 0.06%, #facbbf 99.91%);
`;

const StyledBackground = styled.img`
  position: absolute;
  width: 300px;
  z-index: 0;
  margin: auto;

  @media (min-width: 600px) {
    left: 20%;
    width: 500px;
  }
`;

const StyledMainContent = styled.div`
  position: relative;
  z-index: 1;
  min-height: calc(100vh - var(--chakra-space-32));

  @media (min-width: 600px) {
    margin-left: 25%;
    min-height: calc(100vh - var(--chakra-space-16));
  }
`;

const PeachWrapper = (props) => {
  return (
    <StyledContent>
      <StyledBackground src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1670679735/peach-logo_aoa6a3.png" />
      <StyledMainContent>{props.children}</StyledMainContent>
      <Footer />
    </StyledContent>
  );
};

export default PeachWrapper;
