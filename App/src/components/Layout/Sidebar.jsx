import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Image,
  Button,
  Heading,
  Stack,
  VStack,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
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


export default function Sidebar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box as="section" bg={useColorModeValue("gray.50", "gray.700")} minH="100vh">
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
          d={{ base: "flex", md: "none" }}
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
        <Box as="main" p={14} minH="30rem" bg={useColorModeValue("auto", "gray.800")}>
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

const SidebarContent = ({ ...props }) => (
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
          <Image src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1670527144/HealthyLife/logo_blanco_l865op.svg" alt="logo"/>
          
        </Flex>
        
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="black.300"
          aria-label="Main Navigation"
        > 
         
          <NavItem icon={CiForkAndKnife}>Recetas</NavItem>
          <NavItem icon={BiDumbbell}>Workouts</NavItem>
        </Flex>
        <Box mt="20">
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="black.300"
          aria-label="Main Navigation"
        > 
          <NavItem icon={GiChewedHeart}>Mis Favoritos</NavItem>
          <NavItem icon={TiInputCheckedOutline}>Pendientes</NavItem>
          <NavItem icon={TiInputChecked}>Completados</NavItem>
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

const NavItem = ({ icon, children }) => {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
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
      {children}
    </Flex>
  );
};
