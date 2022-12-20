import React from "react";
import LayoutWrapper from "../components/Layout/LayoutWrapper";
import { NavLink } from "react-router-dom";
import UiButton from "../components/UIComponents/UIButton";
import { ImArrowLeft2 } from "react-icons/im";
import { Box, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <LayoutWrapper>
      <Box
        height="100vh"
        bgImage="https://res.cloudinary.com/drh0lkvxh/image/upload/v1671406411/Rectangle_edm54j.png"
      >
        <NavLink to="/recipes">
          <UiButton variant="back">
            <ImArrowLeft2 />
          </UiButton>
        </NavLink>
        <Text m="auto" fontSize="50px">
          Página no encontrada
        </Text>
      </Box>
    </LayoutWrapper>
  );
};

export default NotFound;
