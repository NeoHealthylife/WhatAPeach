import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import GlobalContext from "../context/GlobalContext";
import { API } from "../services/API";

const CardComp = ({ item }) => {
  const { setItem, user, setUser } = useContext(GlobalContext);
  const isLiked = () => !!user.favRecipes.find((id) => id === item._id);
  const [liked, setLiked] = useState(isLiked);
  const userId = user._id;

  useEffect(() => {
    setLiked(isLiked);
  }, [user, setUser]);

  const navigate = useNavigate();
  const goToDetail = (item) => {
    setItem(item);
    sessionStorage.item = JSON.stringify(item);
    navigate("/recipes/detail");
  };

  const addToFav = (recipeId) => {
    API.patch("/users/addfavrecipe", { userId, recipeId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
    });
  };

  const deleteToFav = (recipeId) => {
    API.patch("/users/deletefavrecipe", { userId, recipeId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
    });
  };

  return (
    <Center>
      <Box
        rounded={"lg"}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        h="360px"
        w="250px"
        boxShadow={useColorModeValue("3px 6px 0 #fe9166", "6px 6px 0 cyan")}
      >
        <Box h={"230px"} borderBottom={"1px"} borderColor="black" position={"relative"}>
          <Image
            roundedTop="xs"
            objectFit="cover"
            h="full"
            w="full"
            alt={item.title}
            src={item.image}
          />
          <Heading
            color={"white"}
            fontSize={"l"}
            position={"absolute"}
            background={"rgba(0,0,0,0.5)"}
            bottom={"0"}
            padding={"1"}
          >
            {item.title}
          </Heading>
        </Box>
        <Box h={"70px"} p={{ base: 1, lg: 2 }}>
          {item.tags.map((tag) => (
            <Box
              key={uuidv4()}
              bg="orange.500"
              display={"inline-block"}
              borderRadius="20px"
              px={2}
              py={0}
              color="white"
              m={"2px"}
              fontSize={"xs"}
              fontWeight="medium"
            >
              {tag}
            </Box>
          ))}
          {/* <Text color={"gray.500"} noOfLines={2}>
            {bodyText}
          </Text> */}
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={2}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Button
              display={{ base: "none", lg: "inline-block" }}
              variant="secondary"
              onClick={() => goToDetail(item)}
            >
              Ver detalle
            </Button>
            <Button
              display={{ base: "inline-block", lg: "none" }}
              variant="secondary"
              onClick={() => goToDetail(item)}
            >
              + Info
            </Button>
          </Flex>
          <Flex
            p={1}
            alignItems="center"
            justifyContent={"space-between"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <IconButton
                onClick={() => deleteToFav(item._id)}
                variant="primary"
                icon={<RiHeart2Fill fill="red" fontSize={"24px"} />}
              />
            ) : (
              <IconButton
                onClick={() => addToFav(item._id)}
                variant="primary"
                icon={<RiHeart2Line color="red" fontSize={"24px"} />}
              />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
};
export default CardComp;
