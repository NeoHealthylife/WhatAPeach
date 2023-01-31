import { useContext } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import GlobalContext from "../../context/GlobalContext";
import { API } from "../../services/API";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UiButton from "../../components/UIComponents/UIButton";
import RegularSelect from "../../components/ChakraComponents/RegularSelect";
import FormInput from "../../components/ChakraComponents/Inputs/FormInput.jsx";
import RegularInput from "../../components/ChakraComponents/Inputs/RegularInput.jsx";
import { foodChoices } from "../../utils/FormChoices";
import { statusChoices } from "../../utils/FormChoices";
import { targetChoices } from "../../utils/FormChoices";
import { equipmentChoices } from "../../utils/FormChoices";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  HStack,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const Edituser = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const { user, showToast, setUser } = useContext(GlobalContext);
  const onFormSubmit = (data) => {
    const dataParam = { ...user, ...data };
    dataParam.equipment = data.equipment === "true" ? true : false;
    API.patch(`/users/${user._id}`, dataParam).then((response) => {
      if (response.status === 201 || response.status === 200) {
        showToast("success", "Usuario actualizado");
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      } else {
        showToast(
          "error",
          "Ha habido un error inesperado. Intenta añadir tu receta a favoritos de nuevo",
        );
      }
    });
  };

  return (
    <LayoutWrapper>
      <Container w="full" centerContent>
        <Flex>
          <Box>
            <Flex align={"center"} justify={"center"}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onFormSubmit)}>
                  <Box>
                    <Stack w="500px" py={2} px={6}>
                      <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow="#101010 4px 6px 0 0"
                        p={8}
                      >
                        <Stack spacing={1}>
                          <Box display="block" m="auto" textAlign="center" mb="30px">
                            <Heading>Perfil</Heading>
                            <Text mt={{ sm: 3, md: 3, lg: 5 }} color="primary">
                              Aquí puedes consultar y editar tus datos
                            </Text>
                          </Box>
                          {user.nickname && (
                            <Box>
                              <FormInput
                                label="Nickname"
                                defaultValue={user.nickname}
                                name="nickname"
                                validations={{
                                  required: "Este campo es requerido",
                                  minLength: {
                                    value: 2,
                                    message: "Necesita un minimo de 2 caracteres",
                                  },
                                }}
                              ></FormInput>
                            </Box>
                          )}
                          {user.email && (
                            <Box>
                              <FormInput
                                label="Email"
                                defaultValue={user.email}
                                name="email"
                                validations={{
                                  required: "Este campo es requerido",
                                  minLength: {
                                    value: 2,
                                    message: "Necesita un minimo de 2 caracteres",
                                  },
                                  pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Dirección de e-mail incorrecta",
                                  },
                                }}
                              />
                            </Box>
                          )}
                          <Box>
                            {user.fullname && (
                              <FormInput text={user.fullname} name="fullname" />
                            )}
                          </Box>
                          <HStack>
                            {user.age && (
                              <Box>
                                <FormInput
                                  label="Edad"
                                  defaultValue={user.age}
                                  name="age"
                                  validations={{
                                    pattern: {
                                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                      message: "Introduce una edad válida",
                                    },
                                  }}
                                ></FormInput>
                              </Box>
                            )}
                            {user.height && (
                              <Box w="70%">
                                <RegularInput
                                  label="Altura"
                                  defaultValue={user.height}
                                  name="height"
                                  validations={{
                                    pattern: {
                                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                      message: "Introduce una altura válida",
                                    },
                                  }}
                                ></RegularInput>
                              </Box>
                            )}
                            {user.weight && (
                              <Box>
                                <RegularInput
                                  label="Peso"
                                  defaultValue={user.weight}
                                  name="weight"
                                  placeholder="Peso (kg)"
                                  validations={{
                                    pattern: {
                                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                      message: "Introduce un peso válido",
                                    },
                                  }}
                                ></RegularInput>
                              </Box>
                            )}
                          </HStack>
                          <HStack>
                            {user.diet && (
                              <Box w="50%">
                                <RegularSelect
                                  label="Dieta"
                                  defaultValue={[user.diet]}
                                  placeholder="Dieta 🥑"
                                  name="diet"
                                  options={foodChoices}
                                  validations={{
                                    required: "Este campo es requerido",
                                  }}
                                />
                              </Box>
                            )}
                            {user.status && (
                              <Box w="50%">
                                <RegularSelect
                                  label="Estado Físico"
                                  defaultValue={[user.status]}
                                  placeholder="Estado físico 💪"
                                  name="status"
                                  options={statusChoices}
                                  validations={{
                                    required: "Este campo es requerido",
                                  }}
                                />
                              </Box>
                            )}
                          </HStack>
                          {user.target && (
                            <Box>
                              <RegularSelect
                                label="Objetivo"
                                defaultValue={user.target}
                                placeholder="Define tus objetivos 🎯"
                                name="target"
                                options={targetChoices}
                                validations={{
                                  required: "Este campo es requerido",
                                }}
                              />
                            </Box>
                          )}
                          {user.equipment !== undefined && (
                            <Box>
                              <RegularSelect
                                label="Material"
                                defaultValue={user.equipment}
                                name="equipment"
                                placeholder="¿Tienes material para tus workouts?"
                                options={equipmentChoices}
                                radioColor="orange"
                                validations={{ required: "Este campo es requerido" }}
                              />
                            </Box>
                          )}
                          <Stack spacing={1} pt={4}>
                            <UiButton variant="primary" type="submit">
                              Editar
                            </UiButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </form>
              </FormProvider>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </LayoutWrapper>
  );
};

export default Edituser;
