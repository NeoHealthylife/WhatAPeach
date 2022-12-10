import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UiButton from "../../components/UIComponents/UIButton";
import UIInput from "../../components/UIComponents/UIFormInput";
import { loginUser } from "../../services/API";
import { FormProvider, useForm } from "react-hook-form";
import UIFormInput from "../../components/UIComponents/UIFormInput";

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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onFormSubmit)}>
          <Stack spacing={8} maxWidth="400px" py={12} px={6}>
            <Stack align={"center"}>
              <Image src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1670515077/HealthyLife/logo_1_kano6g.svg" />
              <Text fontSize={"lg"} color={"gray.600"}>
                si queremos poner una intro de nuestra web
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="#101010 4px 6px 0 0"
              p={8}
            >
              <Stack spacing={4}>
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
                <Stack spacing={10} pt={2}>
                  <button className="loginBtn" type="submit">
                    Entrar
                  </button>
                </Stack>
                <UiButton variant="socialLogin"> Hola </UiButton>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Si no tienes cuenta puedes registrarte{" "}
                    <NavLink color={"blue.400"}>aquí</NavLink>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </Flex>
  );
};

export default Login;
