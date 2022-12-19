import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { useContext } from "react";
import { BiDumbbell } from "react-icons/bi";
import { FiMenu, FiHome, FiInfo } from "react-icons/fi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { NavItemLink } from "../NavItemLink";

export default function Sidebar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box as="section" minH={{ base: 0, lg: "100vh" }}>
      <SidebarContent display={{ base: "none", lg: "unset" }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, lg: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          w="full"
          px="4"
          display={{ base: "flex", lg: "none" }}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          bg={useColorModeValue("soft-primary", "gray.800")}
          justify={{ base: "space-between", lg: "flex-end" }}
          boxShadow="lg"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", lg: "none" }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />
        </Flex>
        <Box
          as="main"
          p={{ base: 0, lg: 14 }}
          minH={{ base: 0, lg: "30rem" }}
          bg={useColorModeValue("auto", "gray.800")}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
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
  const { user, logout } = useContext(GlobalContext);
  let navigate = useNavigate();
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
            aria-label="Main Navigation"
          >
            <Box m="1" borderRadius="5px" overflow="hidden" color="red">
              <NavItemLink icon={FiHome} name="Home" href="/" />
            </Box>
            <Box m="1" borderRadius="5px" overflow="hidden">
              <NavItemLink icon={GiForkKnifeSpoon} name="Recetas" href="/recipes" />
            </Box>
            <Box m="1" borderRadius="5px" overflow="hidden">
              <NavItemLink icon={BiDumbbell} name="Workouts" href="/workouts" />
            </Box>
            <Box m="1" borderRadius="5px" overflow="hidden">
              <NavItemLink icon={FiInfo} name="About" href="/about" />
            </Box>
          </Flex>
          <Divider
            bg="white"
            margin="auto"
            width="200px"
            alignContent="center"
            orientation="horizontal"
          />
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
              <Text fontSize="md">{user?.nickname}</Text>
            </MenuButton>
            <MenuList fontSize={17} zIndex={5555} w="200px">
              <Button w="full" onClick={() => navigate("/perfil/misrecetas")}>
                Mis Recetas
              </Button>
              <Button w="full" onClick={() => navigate("/perfil/editar")}>
                Editar Perfil
              </Button>
              <Button w="full" onClick={() => navigate("/perfil/miswokouts")}>
                Mis workouts
              </Button>
              <Button w="full" onClick={() => logout() & navigate("/login")}>
                Cerrar sesión
              </Button>
            </MenuList>
          </Menu>
        </Flex>
      </VStack>
    </Box>
  );
};
