import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
// import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledMainContent = styled.div`
  position: absolute;
  padding: 10px;
  top: var(--chakra-sizes-20);

  @media (min-width: 600px) {
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
    <div>
      <Sidebar />
      <StyledMainContent>{props.children}</StyledMainContent>

      <StyledFooter>
        <Footer />
      </StyledFooter>
    </div>
  );
};

export default LayoutWrapper;
