import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { BsArrowUpRight } from 'react-icons/bs';
import {RiHeart2Fill, RiHeart2Line} from 'react-icons/ri';


const CardComp=({imgSrc,altImg,textLabel1,headingCard, bodyText})=>{
  const [liked, setLiked] = useState(false);

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'lg'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('3px 6px 0 orange', '6px 6px 0 cyan')}>
        <Box h={'200px'} borderBottom={'1px'} borderColor="black">
          <Img
            src=
              {imgSrc}
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={altImg}
          />
        </Box>
        <Box p={4}>
          <Box
            bg="orange.500"
            display={'inline-block'}
            borderRadius="20px"
            px={2}
            py={1}
            color="white"
            mb={2}>
            <Text fontSize={'xs'} fontWeight="medium">
              {textLabel1}
            </Text>
          </Box>
          <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
            {headingCard}
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
            {bodyText}
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Text fontSize={'md'} fontWeight={'semibold'}>
              Ver más
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={1}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor="pointer"
            onClick={() => setLiked(!liked)}>
            {liked ? (
             <IconButton 
             _hover={{ background: 'none',
             borderColor:'none', }}
            _active={{
                background: 'none',
                borderColor: 'none',
            }}
            _focus={{
                boxShadow:
                'none !important',
                borderColor:'none',
            }} 
             variant="ghost" icon={ <RiHeart2Fill fill="red" fontSize={'24px'} />} />
            ) : (
                <IconButton variant="ghost" icon={ <RiHeart2Line color="red" fontSize={'24px'} />} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
export default CardComp