import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";

import { EditIcon, RepeatIcon, HamburgerIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import React from "react";

export const HamMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem bg="orange">New Tab</MenuItem>
        <MenuItem icon={<ExternalLinkIcon />}>New Window</MenuItem>
        <MenuItem icon={<RepeatIcon />}>Open Closed Tab</MenuItem>
        <MenuItem icon={<EditIcon />}>Open File...</MenuItem>
      </MenuList>
    </Menu>
  );
};
