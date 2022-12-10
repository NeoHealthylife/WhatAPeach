import React from "react";
import { NavLink } from "react-router-dom";
import {Icon, useColorModeValue, Flex, Box, } from "@chakra-ui/react"



export const NavItemLinkNoHover = ({ icon, name, href, hoverProps,fontSize}) => {
  const color = 'primary';

  return (
    <NavLink to={href}>
      <Box
        fontSize={fontSize}
        align="center"
        cursor="pointer"
        role="group"
        color={useColorModeValue("blackAlpha.700", "gray.400")}
        _hover={
          {hoverProps}
        }
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {name}
      </Box>
    </NavLink>
  );
};
