import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Icon, useColorModeValue, Flex } from "@chakra-ui/react";
import GlobalContext from "../context/GlobalContext";

export const NavItemLink = ({ icon, name, href }) => {
  const color = useColorModeValue("gray.600", "gray.300");
  const { activePage, setActivePage } = useContext(GlobalContext);

  const handleClick = (href) => {
    setActivePage(href);
  };

  return (
    <NavLink to={href} onClick={() => handleClick(href)}>
      <Flex
        fontSize="md"
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        color={activePage === href ? "primary" : "white"}
        bg={activePage === href ? "white" : "soft-primary"}
        _hover={{
          bg: useColorModeValue("white", "gray.900"),
          color: useColorModeValue("primary", "gray.200"),
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
