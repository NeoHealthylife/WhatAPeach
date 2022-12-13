import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
// import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledMainWrapper = styled.div`
  max-width: 100vw;
`;

const StyledMainContent = styled.div`
  padding: 10px;
  min-height: 100vh;

  @media (min-width: 600px) {
    position: absolute;
    top: var(--chakra-sizes-20);
    padding: 20px;
    width: calc(100% - var(--chakra-sizes-60));
    top: 0;
    right: 0;
  }
`;

const StyledFooter = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    width: calc(100% - var(--chakra-sizes-60));
    margin-left: var(--chakra-sizes-60);
  }
`;

const LayoutWrapper = (props) => {
  return (
    <StyledMainWrapper>
      <Sidebar />
      <StyledMainContent>{props.children}</StyledMainContent>

      <StyledFooter>
        <Footer />
      </StyledFooter>
    </StyledMainWrapper>
  );
};

export default LayoutWrapper;
