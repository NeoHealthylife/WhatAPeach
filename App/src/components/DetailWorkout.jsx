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
import { Navigate, NavLink } from "react-router-dom";
import { API } from "../services/API";
import UiButton from "./UIComponents/UIButton";
import { ImArrowLeft2 } from "react-icons/im";

export const DetailWorkout = () => {
  const { item, user, setUser, showToast } = useContext(GlobalContext);
  const isFavourite = () => !!user.favWorkouts.find((id) => id === item._id);
  const [liked, setLiked] = useState(isFavourite);
  const isToDo = () => !!user.toDoWorkouts.find((id) => id === item._id);
  const [todo, setToDo] = useState(isToDo);
  const isCompleted = () => !!user.completedWorkouts.find((id) => id === item._id);
  const [completed, setCompleted] = useState(isCompleted);
  const userId = user._id;

  const addToFav = (workoutId) => {
    API.patch("/users/addfavworkout", { userId, workoutId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
      if (response.status === 201 || response.status === 200) {
        showToast("success", "El workout ha sido añadido a lista de favoritos 😍");
      } else {
        showToast(
          "error",
          "Ha habido un error inesperado. Intenta añadir tu workout a favoritos más tarde",
        );
      }
    });
  };

  const deleteToFav = (workoutId) => {
    API.patch("/users/deletefavworkout", { userId, workoutId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
      if (response.status === 201 || response.status === 200) {
        showToast("success", "El workout ha sido eliminado de la lista de favoritos");
      } else {
        showToast(
          "error",
          "Ha habido un error inesperado. Intenta añadir tu workout a favoritos más tarde",
        );
      }
    });
  };
  const addToDo = (workoutId) => {
    API.patch("/users/todoworkout", { userId, workoutId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
      if (response.status === 201 || response.status === 200) {
        showToast("success", "El workout ha sido añadido a lista de pendientes 😍");
      } else {
        showToast(
          "error",
          "Ha habido un error inesperado. Intenta añadir tu workout a tu lista de pendientes más tarde",
        );
      }
    });
  };
  const deleteToDo = (workoutId) => {
    API.patch("/users/deletetodoworkout", { userId, workoutId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      localStorage.setItem("user", JSON.stringify(editedUser));
      if (response.status === 201 || response.status === 200) {
        showToast("success", "El workout ha sido eliminado de la lista de pendientes");
      } else {
        showToast(
          "error",
          "Ha habido un error inesperado. Intenta eliminar tu workout de tu lista de pendientes más tarde",
        );
      }
    });
  };
  const addToCompleted = (workoutId) => {
    API.patch("/users/addcompleteworkout", { userId, workoutId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      setCompleted(true);
      localStorage.setItem("user", JSON.stringify(editedUser));
      if (response.status === 201 || response.status === 200) {
        showToast("success", "El workout ha sido añadido a lista de completados 😍");
      } else {
        showToast(
          "error",
          "Ha habido un error inesperado. Intenta añadir tu workout a tu lista de completados más tarde",
        );
      }
    });
  };
  const deleteFromCompleted = (workoutId) => {
    API.patch("/users/deletecompleteworkout", { userId, workoutId }).then((response) => {
      const editedUser = response.data;
      setUser(editedUser);
      setCompleted(false);
      localStorage.setItem("user", JSON.stringify(editedUser));
      if (response.status === 201 || response.status === 200) {
        showToast("success", "La receta ha sido añadida a tu lista de completados");
      } else {
        showToast(
          "error",
          "Ha habido un error inesperado. Intenta eliminar tu receta de tu lista de completados de nuevo",
        );
      }
    });
  };
  return (
    <>
      {item !== null ? (
        <Center py={2}>
          <Box
            margin={{ base: 0, md: "1rem" }}
            bg="white"
            borderRadius="20px"
            p={{ base: "10px", md: "20px" }}
            bgGradient="linear(to-r, #c03c031e , #f68c1336, #0ed28734)"
          >
            <Box display="flex" justifyContent={"center"} alignContent="center">
              <Image
                borderRadius="10px"
                objectFit={"cover"}
                h="full"
                width={{ base: "100%", md: "60%" }}
                maxWidth={{ base: "100%", md: "600px" }}
                maxHeight={{ base: "auto", md: "600px" }}
                alt={item.title}
                src={item.image}
              />
            </Box>
            <Box
              width={{ base: "100%", md: "600px" }}
              display={"flex"}
              justifyContent="flex-end"
              m="auto"
              mt="2rem"
            >
              {!completed && (
                <Flex
                  p={2}
                  flexDirection={"row"}
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
              )}

              {todo && (
                <Flex
                  p={2}
                  alignItems="center"
                  roundedBottom={"sm"}
                  cursor={"pointer"}
                  w="150px"
                >
                  {todo && !completed && (
                    <>
                      <Button onClick={() => addToCompleted(item._id)}>Completar</Button>
                    </>
                  )}
                  {completed && (
                    <Button onClick={() => deleteFromCompleted(item._id)}>
                      Completado
                    </Button>
                  )}
                </Flex>
              )}
              <Flex
                p={1}
                alignItems="center"
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
            </Box>
            <Box mt="1rem">
              <Heading alignContent="center" variant="H1" mb="1.5rem">
                {item.title}
              </Heading>
              {item.tags.length &&
                item.tags.map((tag) => (
                  <Box
                    key={uuidv4()}
                    bg="primary"
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
              columnGap="150px"
              p="2"
              px={{ base: "auto", md: "3rem" }}
              mt="2rem"
              flexDirection={{ base: "column-reverse", md: "row" }}
            >
              <Box width={{ base: "100%", md: "65%" }}>
                <Heading variant="H2">Workout</Heading>
                <OrderedList mt="1rem">
                  {item.workout.length &&
                    item.workout.map((num, index) => (
                      <ListItem
                        key={`paso_${index}`}
                        mb="1rem"
                        fontSize="md"
                        gap="8"
                        textAlign="justify"
                      >
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
                  <Heading variant="H2">Material</Heading>
                  <UnorderedList mt="1rem">
                    {item.material.map((num) => (
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
        <Navigate to="/workouts" />
      )}
    </>
  );
};
