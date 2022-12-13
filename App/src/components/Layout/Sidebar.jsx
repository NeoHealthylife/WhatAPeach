import {
  Avatar,
  Box,
  Flex,
  Link,
  Image,
  Button,
  Stack,
  VStack,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
  Text,
  useRadio,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { AiOutlineTeam, AiOutlineHome } from "react-icons/ai";
import { BsFolder2, BsCalendarCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import { GiChewedHeart } from "react-icons/gi";
import { TiInputCheckedOutline, TiInputChecked } from "react-icons/ti";
import { CiForkAndKnife } from "react-icons/ci";
import { BiDumbbell } from "react-icons/bi";
import { NavItemLink } from "../NavItemLink";
import LayoutWrapper from "./LayoutWrapper";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function Sidebar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH={{ base: 0, md: "100vh" }}
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          w="full"
          px="4"
          display={{ base: "flex", md: "none" }}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          bg={useColorModeValue("soft-primary", "gray.800")}
          justify={{ base: "space-between", md: "flex-end" }}
          boxShadow="lg"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />
        </Flex>
        <Box
          as="main"
          p={{ base: 0, md: 14 }}
          minH={{ base: 0, md: "30rem" }}
          bg={useColorModeValue("auto", "gray.800")}
        >
          <Stack
            direction={{ base: "column", sm: "row" }}
            alignItems="center"
            justifyContent="center"
            h="100%"
          ></Stack>
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ ...props }) => {
  const { user } = useContext(GlobalContext);
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      // pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("soft-primary", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <VStack h="full" w="full" alignItems="flex-start" justify="space-between">
        <Box w="full">
          <Flex px="4" py="5" align="center" justifyContent="center">
            <NavLink to="/">
              <Image
                src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1670527144/HealthyLife/logo_blanco_l865op.svg"
                alt="logo"
              />
            </NavLink>
          </Flex>

          <Flex
            direction="column"
            as="nav"
            mb="5"
            fontSize="md"
            color="black.300"
            aria-label="Main Navigation"
          >
            <NavItemLink icon={CiForkAndKnife} name="Recetas" href="/recipes" />
            <NavItemLink icon={BiDumbbell} name="Workout" href="/workouts" />
          </Flex>
          <Divider
            bg="white"
            margin="auto"
            width="200px"
            alignContent="center"
            orientation="horizontal"
          />
          <Box mt="5">
            <Flex
              direction="column"
              as="nav"
              fontSize="md"
              color="black.300"
              aria-label="Main Navigation"
            >
              <NavItemLink icon={GiChewedHeart} name="Mis Favoritos" href="/favorites" />
              <NavItemLink
                icon={TiInputCheckedOutline}
                name="Pendientes"
                href="/pending"
              />
              <NavItemLink icon={TiInputChecked} name="Completados" href="/commpleted" />
            </Flex>
          </Box>
        </Box>

        <Flex px="4" py="5" mt={10} justify="center" alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              size={"sm"}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              _hover={{ textDecoration: "none" }}
            >
              <Avatar
                size={"md"}
                name="Ahmad"
                src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              />
              <Text fontSize="md">{user.nickname}</Text>
            </MenuButton>
            <MenuList fontSize={17} zIndex={5555}>
              <MenuItem as={Link} to="#">
                My profile
              </MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </VStack>
    </Box>
  );
};
