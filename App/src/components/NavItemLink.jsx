import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, useColorModeValue, Flex } from "@chakra-ui/react";

export const NavItemLink = ({ icon, name, href }) => {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <NavLink to={href}>
      <Flex
        fontSize="md"
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        color={"white"}
        _hover={{
          bg: useColorModeValue("primary", "gray.900"),
          color: useColorModeValue("white", "gray.200"),
        }}
        // {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            color="white"
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
