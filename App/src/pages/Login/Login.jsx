import { Box, Flex, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UiButton from "../../components/UIComponents/UIButton";
import { BsGoogle } from "react-icons/bs";
import { API } from "../../services/API";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

import {
  default as UIFormInput,
  default as UIInput,
} from "../../components/UIComponents/UIFormInput";
import { NavItemLinkNoHover } from "../../components/UIComponents/NavItemLink-NoHover";
import { myTheme } from "../../components/UIComponents/Theme";
import PeachWrapper from "../../components/Layout/PeachWrapper";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  /*  const { user, setUser } = useState; */
  const toast = useToast();
  const { setJwt, setUser } = useContext(GlobalContext);
  const methods = useForm();
  const navigate = useNavigate();

  const handleGoogleClick = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/api/users/auth/google";
  };

  const onFormSubmit = (data) => {
    API.post("/users/login", data)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setJwt(res.data.token);
          setUser(res.data.user);
          navigate("/");
        }
      })
      .catch(() => {
        toast({
          position: "top",
          title: "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <PeachWrapper>
      <Flex align={"center"} justify={"center"}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit)}>
            <Stack spacing={8} w="430px" py={12} px={6}>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow="#101010 4px 6px 0 0"
                p={8}
              >
                <Stack align={"center"}>
                  <Image src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1670515077/HealthyLife/logo_1_kano6g.svg" />
                  <Text fontSize={"lg"} color={"gray.600"}>
                    si queremos poner una intro de nuestra web
                  </Text>
                </Stack>

                <Stack spacing={2}>
                  <Box>
                    <UIFormInput
                      name="nickname"
                      placeholder="Nickname"
                      validations={{
                        required: "Este campo es requerido",
                        minLength: {
                          value: 2,
                          message: "Necesita un minimo de 2 caracteres",
                        },
                      }}
                    ></UIFormInput>
                  </Box>
                  <Box>
                    <UIInput
                      name="password"
                      placeholder="******"
                      type="password"
                      validations={{
                        required: "Este campo es requerido",
                        minLength: {
                          value: 6,
                          message: "Este campo debe tener al menos 6 caracteres",
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
                  </Box>
                  <Stack spacing={1} pt={2}>
                    <UiButton variant="primary" type="submit">
                      Entrar
                    </UiButton>
                    <Flex justifyContent="center">
                      <Text fontSize="md">o</Text>
                    </Flex>
                    <UiButton variant="secondary" onClick={(e) => handleGoogleClick(e)}>
                      <BsGoogle />
                      Accede con Google
                    </UiButton>
                  </Stack>
                  <Stack pt={6}>
                    <Text fontSize="13px" align={"center"}>
                      Si no tienes cuenta puedes registrarte{" "}
                      <NavItemLinkNoHover
                        name="aquí"
                        href="/register"
                        hoverColor={myTheme.colors.primary}
                      />
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </form>
        </FormProvider>
      </Flex>
    </PeachWrapper>
  );
};

export default Login;
