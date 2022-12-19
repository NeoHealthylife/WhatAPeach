import React from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import GlobalContext from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import { API } from "../../services/API";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UiButton from "../../components/UIComponents/UIButton";
import { HiOutlineEyeSlash, HiOutlineEye } from "react-icons/hi2";
import UISelect from "../../components/UIComponents/UISelect";
import {
  default as UIFormInput,
  default as UIInput,
} from "../../components/UIComponents/UIFormInput";
import { NavItemLinkNoHover } from "../../components/UIComponents/NavItemLink-NoHover";
import { myTheme } from "../../components/ChakraComponents/Theme";
import PeachWrapper from "../../components/Layout/PeachWrapper";
import { useToast } from "@chakra-ui/react";
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
  IconButton,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  InputGroup,
  Image,
  Stack,
  useColorModeValue,
  InputRightElement,
} from "@chakra-ui/react";
const EditProfile = () => {
  const [profile, setProfile] = useState({});
  const toast = useToast();
  const methods = useForm();
  const onFormSubmit = (data) => {
    data.equipment = data.equipment === "true" ? true : false;
    API.patch(`/users/${profile._id}`, data)
      .then((res) => {
        if (res.data.status === 201 || res.data.status === 200) {
          toast({
            position: "top",
            title: "Usuario actualizamos correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch(() => {
        toast({
          position: "top",
          title: "No es posible actualizar la cuenta. Intentalo de nuevo",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const initialValue = JSON.parse(savedUser);
    const userId = initialValue._id;
    API.get(`/users/${userId}`).then((res) => setProfile(res.data));
    console.log(initialValue);
  }, []);

  return (
    <LayoutWrapper>
      <Container
        w="full"
        centerContent
        backgroundImage="https://res.cloudinary.com/drh0lkvxh/image/upload/v1671406411/Rectangle_edm54j.png"
      >
        <Flex>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Perfil</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="primary">
                    Aquí puedes consultar y editar tus datos
                  </Text>
                </Box>
              </WrapItem>
              <WrapItem>
                <Flex align={"center"} justify={"center"}>
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onFormSubmit)}>
                      <Box>
                        <Stack w="430px" py={8} px={6}>
                          <Box
                            rounded={"lg"}
                            bg={useColorModeValue("white", "gray.700")}
                            boxShadow="#101010 4px 6px 0 0"
                            p={6}
                          >
                            <Stack spacing={1}>
                              {profile.nickname && (
                                <Box>
                                  <UIFormInput
                                    label="Nickname"
                                    defaultValue={profile.nickname}
                                    name="nickname"
                                    validations={{
                                      required: "Este campo es requerido",
                                      minLength: {
                                        value: 2,
                                        message: "Necesita un minimo de 2 caracteres",
                                      },
                                    }}
                                  ></UIFormInput>
                                </Box>
                              )}
                              {/* <InputGroup position="relative">
                                  <UIInput
                                    name="password"
                                    type={show ? "text" : "password"}
                                    placeholder="******"
                                    validations={{
                                      required: "Este campo es requerido",
                                      minLength: {
                                        value: 6,
                                        message:
                                          "Este campo debe tener al menos 6 caracteres",
                                      },
                                      pattern: {
                                        value: /^\S*$/,
                                        message: "El formato no es correcto", // JS only: <p>error message</p> TS only support string
                                      },
                                      validate: {
                                        format: (password) => {
                                          return (
                                            (/[A-Z]/g.test(password) &&
                                              /[a-z]/g.test(password) &&
                                              /[0-9]/g.test(password)) ||
                                            "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
                                          );
                                        },
                                      },
                                    }}
                                  ></UIInput>
                                  <InputRightElement
                                    position="absolute"
                                    top="8px"
                                    right="8px"
                                    width="initial"
                                  >
                                    <IconButton
                                      variant="primary"
                                      bg="transparent"
                                      h="1.75rem"
                                      size="lg"
                                      color="primary"
                                      onClick={handleClick}
                                    >
                                      {show ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                                    </IconButton>
                                  </InputRightElement>
                                </InputGroup> */}

                              {profile.email && (
                                <Box>
                                  <UIFormInput
                                    label="Email"
                                    defaultValue={profile.email}
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
                                {profile.fullname && (
                                  <UIFormInput text={profile.fullname} name="fullname" />
                                )}
                              </Box>
                              <HStack>
                                {profile.age && (
                                  <Box>
                                    <UIFormInput
                                      label="Edad"
                                      defaultValue={profile.age}
                                      name="age"
                                      validations={{
                                        pattern: {
                                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                          message: "Introduce una edad válida",
                                        },
                                      }}
                                    ></UIFormInput>
                                  </Box>
                                )}
                                {profile.height && (
                                  <Box w="70%">
                                    <UIInput
                                      label="Altura"
                                      defaultValue={profile.height}
                                      name="height"
                                      validations={{
                                        pattern: {
                                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                          message: "Introduce una altura válida",
                                        },
                                      }}
                                    ></UIInput>
                                  </Box>
                                )}
                                {profile.weight && (
                                  <Box>
                                    <UIInput
                                      label="Peso"
                                      defaultValue={profile.weight}
                                      name="weight"
                                      placeholder="Peso (kg)"
                                      validations={{
                                        pattern: {
                                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                          message: "Introduce un peso válido",
                                        },
                                      }}
                                    ></UIInput>
                                  </Box>
                                )}
                              </HStack>
                              <HStack>
                                {profile.diet && (
                                  <Box w="50%">
                                    <UISelect
                                      defaultvalue={[profile.diet]}
                                      placeholder="Dieta 🥑"
                                      name="diet"
                                      options={foodChoices}
                                      validations={{
                                        required: "Este campo es requerido",
                                      }}
                                    />
                                  </Box>
                                )}
                                {profile.status && (
                                  <Box w="50%">
                                    <UISelect
                                      defaultvalue={[profile.status]}
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
                              {profile.target && (
                                <Box>
                                  <UISelect
                                    defaultvalue={profile.target} /////POR QUÉ NO NECESITO ESPECIFICAR QUE ES UN ARRAY??
                                    placeholder="Define tus objetivos 🎯"
                                    name="target"
                                    options={targetChoices}
                                    validations={{
                                      required: "Este campo es requerido",
                                    }}
                                  />
                                </Box>
                              )}
                              {profile.equipment !== undefined && (
                                <Box>
                                  <UISelect
                                    defaultvalue={profile.equipment}
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
              </WrapItem>
            </Wrap>
          </Box>
        </Flex>
      </Container>
    </LayoutWrapper>
  );
};

export default EditProfile;
