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
} from "@chakra-ui/react";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";


const CardComp = ({ imgSrc, altImg, textLabel1, headingCard, bodyText }) => {
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
        h= "42vh"
        w= "30vh"
        boxShadow={useColorModeValue("3px 6px 0 #fe9166", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Image 
           roundedTop= "sm"
           objectFit= "cover"
           h= "full"
           w= "full"
            src={"https://res.cloudinary.com/drh0lkvxh/image/upload/v1670237459/HealthyLife/ensalada-de-aguacate-00552796_4d7c6937_1134x1512_pkogwq.jpg"}
           
            
          />
        </Box>
        <Box p={4}>
          <Box
            bg="orange.500"
            display={"inline-block"}
            borderRadius="20px"
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {textLabel1}
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {headingCard}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {bodyText}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Ver más
            </Text>
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
