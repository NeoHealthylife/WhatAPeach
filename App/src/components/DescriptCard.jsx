import LayoutWrapper from "./Layout/LayoutWrapper";
// import { recipes } from "../../services/recipe";
import {
  Box,
  Center,
  Text,
  Heading,
  Image,
  Flex,
  IconButton,
  HStack,
  Button,
  OrderedList,
  ListItem,
  Divider,
  UnorderedList,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import { Navigate } from "react-router-dom";
import { API } from "../services/API";

export const DescriptCard = () => {
  const { item, user, setUser } = useContext(GlobalContext);
  const isFavourite = () => !!user.favRecipes.find((id) => id === item._id);
  const [liked, setLiked] = useState(isFavourite);
  const isToDo = () => !!user.toDoRecipes.find((id) => id === item._id);
  const [todo, setToDo] = useState(isToDo);
  const isCompleted = () => !!user.completedRecipes.find((id) => id === item._id);
  const [completed, setCompleted] = useState(isCompleted);
  const userId = user._id;

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
  const addToDo = (recipeId) => {
    API.patch("/users/todorecipe", { userId, recipeId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
    });
  };
  const deleteToDo = (recipeId) => {
    API.patch("/users/deletetodorecipe", { userId, recipeId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
    });
  };
  const addToCompleted = (recipeId) => {
    API.patch("/users/addcompleterecipe", { userId, recipeId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      setCompleted(true);
      localStorage.setItem("user", JSON.stringify(editedUser));
    });
  };
  const deleteFromCompleted = (recipeId) => {
    API.patch("/users/deletecompleterecipe", { userId, recipeId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      setCompleted(false);
      localStorage.setItem("user", JSON.stringify(editedUser));
    });
  };
  return (
    <>
      {item !== null ? (
        <Center py={2}   >
          <Box
            h="100%"
            margin={{ base: 0, md: "1rem" }}
            bg="white"
            borderRadius="20px"
            p={{ base: "10px", md: "20px" }}
            bgGradient="linear(to-r, #c03c031e , #f68c1336, #0ed28734)"
          >
            <Box display="flex-block" w="80%" ml="80px">
              <Flex key={item._id} w="950px" h={"350px"} justifyContent="center">
                <Image
                  borderRadius="10px"
                  objectFit={"cover"}
                  h="full"
                  width={"65%"}
                  alt={item.title}
                  src={item.image}
                  display="flex"
                  justifyContent={"center"}
                />
              </Flex>
              <HStack display={"flex"} justifyContent="flex-end" mt="1rem" mr="22px">
                <HStack display={"flex"} justifyContent="center" >
                  <Flex
                    p={2}
                    flexDirection={"row"}
                    justifyContent={"flex-end"}
                    ml="50px"
                    roundedBottom={"sm"}
                    cursor={"pointer"}
                    
                    onClick={() => setToDo(!todo)}
                  >
                    {!todo && !completed && (
                      <Button variant="secondary" onClick={() => addToDo(item._id)}>
                        Let's do it!
                      </Button>
                    )}

                    {todo && !completed && (
                      <Button variant="secondary" onClick={() => deleteToDo(item._id)}>
                        No me interesa 😥
                      </Button>
                    )}
                  </Flex>
                  <Flex
                    p={2}
                    alignItems="center"
                    justifyContent={"flex-end"}
                    roundedBottom={"sm"}
                    cursor={"pointer"}
                    w="150px"
                  >
                    {todo && !completed && (
                      <>
                        <Button onClick={() => addToCompleted(item._id)}>
                          Completar
                        </Button>
                      </>
                    )}
                    {completed && (
                      <Button onClick={() => deleteFromCompleted(item._id)}>
                        Completado
                      </Button>
                    )}
                  </Flex>
                </HStack>
                <Flex
                  p={1}
                  alignItems="center"
                  justifyContent={"space-around"}
                  roundedBottom={"sm"}
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

            <Box mt="1rem">
              <Heading alignContent="center" variant="H1" mb="1.5rem">
                {item.title}
              </Heading>
              {item.tags.length &&
                item.tags.map((tag) => (
                  <Box
                    key={uuidv4()}
                    bg="orange.500"
                    display={"inline-block"}
                    borderRadius="20px"
                    px={3}
                    py={1}
                    mr="1rem"
                    color="white"
                    mb={2}
                    fontSize={"xs"}
                    fontWeight="medium"
                  >
                    {tag}
                  </Box>
                ))}
            </Box>
            <Flex
              alignContent="center"
              display="flex"
              columnGap="10rem"
              p="2"
              mt="2rem"
              justifyContent="space-between"
              flexDirection={{ base: "column-reverse", md: "row" }}
            >
              <Box width="65%">
                <Heading variant="H2">Instrucciones:</Heading>
                <OrderedList mt="1rem">
                  {item.recipe.length &&
                    item.recipe.map((num, index) => (
                      <ListItem key={`paso_${index}`} mb="1rem" fontSize="md" gap="8">
                        {num}
                      </ListItem>
                    ))}
                </OrderedList>
              </Box>
              <Box display="block">
                <Box display="flex" mb="2rem">
                  <Heading variant="H2">Tiempo:</Heading>
                  <Text fontSize="md"> {item.time} min</Text>
                </Box>
                <Box>
                  <Heading variant="H2">Ingredientes (4 pers):</Heading>
                  <UnorderedList mt="1rem">
                    {item.ingredients.map((num) => (
                      <ListItem mb="1rem" fontSize="md" key={uuidv4()}>
                        {num}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Center>
      ) : (
        <Navigate to="/recipes" />
      )}
    </>
  );
};
