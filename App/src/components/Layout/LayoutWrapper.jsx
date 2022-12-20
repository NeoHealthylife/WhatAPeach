import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
// import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import UiButton from "../UIComponents/UIButton";

const StyledMainWrapper = styled.div`
  max-width: 100vw;
`;

const RightContentWrapper = styled.div`
  width: 100%;
  @media (min-width: 991px) {
    position: absolute;
    width: calc(100% - var(--chakra-sizes-60));
    top: 0;
    right: 0;
  }
`;

const StyledMainContent = styled.div`
  box-sizing: content-box;
  padding: 10px;
  min-height: 100vh;

  @media (min-width: 991px) {
    top: var(--chakra-sizes-20);
    padding: 20px;
  }
`;
const backBtnExceptions = ["/"];
const LayoutWrapper = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledMainWrapper>
      <Sidebar />
      <RightContentWrapper>
        <StyledMainContent>
          {!backBtnExceptions.includes(location.pathname) && (
            <UiButton variant="back" onClick={() => navigate(-1)}>
              <ImArrowLeft2 />
            </UiButton>
          )}
          {props.children}
        </StyledMainContent>

        <Footer />
      </RightContentWrapper>
    </StyledMainWrapper>
  );
};

export default LayoutWrapper;
