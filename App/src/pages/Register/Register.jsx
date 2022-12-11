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

const Register = () => {
  const { user, setUser } = useState;

  const methods = useForm();
  const navigate = useNavigate();

  const onFormSubmit = () => {
    console.log("SUBMIT");
    // RegisterUser({
    //   nickname: ev.nickname,
    //   password: ev.password,
    // }).then(navigate(`register/form/`));
  };

  return (
    <PeachWrapper>
      <Flex align={"center"} justify={"center"}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit)}>
            <Stack w="430px" py={12} px={6}>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow="#101010 4px 6px 0 0"
                p={8}
              >
               <Stack  align={"center"}>
                <Image src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1670515077/HealthyLife/logo_1_kano6g.svg" />
                <Text alignSelf='flex-start' pt='15px' fontWeight='bold'>
                  Crea tu cuenta
                </Text>
              </Stack>
                <Stack  spacing={4}>
                  <Box>
                    <UIFormInput
                      name="nickname"
                      placeholder="Nickname"
              
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
                  <Stack spacing={1} pt={8}>
                    <UiButton variant="primary" type="submit">
                      Crear cuenta
                    </UiButton>
                  </Stack>
                  <Stack pt={4}>
                    <Text fontSize='13px' align={"center"}>
                      Si ya tienes cuenta puedes entrar {" "}
                      <NavItemLinkNoHover
                        name="aquí"
                        href="/login"
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

export default Register;
