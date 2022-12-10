import React from "react";
import { NavLink } from "react-router-dom";
import {Icon, useColorModeValue, Flex, } from "@chakra-ui/react"



export const NavItemLink = ({ icon, name, href }) => {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <NavLink to={href}>
      <Flex
        fontSize="lg"
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        color={useColorModeValue("blackAlpha.700", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        // {...rest}
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
        
      </Flex>
    </NavLink>
  );
};
