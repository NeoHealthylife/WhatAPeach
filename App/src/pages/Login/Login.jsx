import { Box, Flex, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UiButton from "../../components/UIComponents/UIButton";
import { BsGoogle } from "react-icons/bs";

import {
  default as UIFormInput,
  default as UIInput,
} from "../../components/UIComponents/UIFormInput";
import { NavItemLinkNoHover } from "../../components/UIComponents/NavItemLink-NoHover";
import { myTheme } from "../../components/UIComponents/Theme";
import PeachWrapper from "../../components/Layout/PeachWrapper";

const Login = () => {
  const { user, setUser } = useState;

  const methods = useForm();
  const navigate = useNavigate();

  const onFormSubmit = () => {
    console.log("SUBMIT");
    // loginUser({
    //   nickname: ev.nickname,
    //   password: ev.password,
    // }).then(navigate(`dashboard/`));
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
               
                <Stack  spacing={4}>
                  <Box>
                    <UIFormInput
                      name="nickname"
                      placeholder="Nickname"
                      onChange={(ev) => setUser({ ...user, nickname: ev.target.value })}
                      validations={{
                        required: "Esto es requerido",
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
                      onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                      validations={{
                        required: "Esto es requerido",
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
                    <UiButton variant="secondary">
                      <BsGoogle />
                      Accede con Google
                    </UiButton>
                  </Stack>
                  <Stack pt={6}>
                    <Text fontSize='13px' align={"center"}>
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
