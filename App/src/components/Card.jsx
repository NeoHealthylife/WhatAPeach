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
  Button
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";


const CardComp = ({ imgSrc, altImg, textLabel1, headingCard, bodyText, tags }) => {
  const [liked, setLiked] = useState(false);

  
return (
    <Center py={6}>
      <Box
        rounded={"lg"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        h="42vh"
        w="30vh"
        boxShadow={useColorModeValue("3px 6px 0 #fe9166", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Image
            roundedTop="sm"
            objectFit="cover"
            h="full"
            w="full"
            alt={altImg}
            src={imgSrc}
          />
        </Box>
        <Box p={5}>
        {tags.map((tag) => ( 
          <Box
          key={uuidv4()}
            bg="orange.500"
            display={"inline-block"}
            borderRadius="20px"
            px={3}
            py={1}
            color="white"
            mb={2}
            fontSize={"xs"} fontWeight="medium"
          >
            {tag}
          </Box>
           ))} 
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {headingCard}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {bodyText}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={3}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Button  variant="secondary">
              Ver más
            </Button>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={1}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
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
