import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const CardComp = ({ imgSrc, altImg, headingCard, bodyText, tags, node }) => {
  const { liked, setLiked } = useState(false);
  const { setRecipe } = useContext(GlobalContext);

  const navigate = useNavigate();
  const goToDetail = (recipe) => {
    setRecipe(recipe);
    sessionStorage.recipe = JSON.stringify(recipe);
    //PROBAD CON UN SESSION
    navigate("/recipes/detail");
  };

  return (
    <Center py={6}>
      <Box
        rounded={"lg"}
        my={5}
        mx={5}
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
            alt={altImg}
            src={imgSrc}
          />
          <Heading
            color={"white"}
            fontSize={"l"}
            position={"absolute"}
            background={"rgba(0,0,0,0.5)"}
            bottom={"0"}
            padding={"1"}
          >
            {node.title}
          </Heading>
        </Box>
        <Box h={"70px"} p={{ base: 1, lg: 2 }}>
          {tags.map((tag) => (
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
          <Text color={"gray.500"} noOfLines={2}>
            {bodyText}
          </Text>
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
              onClick={() => goToDetail(node)}
            >
              Ver detalle
            </Button>
            <Button
              display={{ base: "inline-block", lg: "none" }}
              variant="secondary"
              onClick={() => goToDetail(node)}
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
                variant="primary"
                icon={<RiHeart2Fill fill="red" fontSize={"24px"} />}
              />
            ) : (
              <IconButton
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
