import React from "react";
import LayoutWrapper from "../components/Layout/LayoutWrapper";
import { Image, Box } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <LayoutWrapper>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Image
          borderRadius="20px"
          height="80vh"
          src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1671565632/shutterstock_1024842337_Converted_-01_1_dozbeu.png"
        />
      </Box>
    </LayoutWrapper>
  );
};

export default NotFound;
