import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const StyledMainContent = styled.div`
  position: absolute;
  padding: 10px;
  top: var(--chakra-sizes-20);

  @media (min-width: 600px) {
    padding: 20px;
    width: calc(100% - var(--chakra-sizes-60));
    top: var(--chakra-sizes-20);
    right: 0;
  }
`;

const LayoutWrapper = (props) => {
  return (
    <div>
      <Header />
      <StyledMainContent>{props.children}</StyledMainContent>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
