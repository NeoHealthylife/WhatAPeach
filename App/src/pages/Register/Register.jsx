import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../components/Styled-Components/StyledButton";
import { API } from "../../services/API";
import { HiOutlineEyeSlash, HiOutlineEye } from "react-icons/hi2";
import RegularSelect from "../../components/ChakraComponents/RegularSelect";
import FormInput from "../../components/ChakraComponents/Inputs/FormInput.jsx";
import { StyledLoginLink } from "../../components/Styled-Components/StyledLoginLink";
import { myTheme } from "../../components/ChakraComponents/Custom-theme/Theme";
import PeachWrapper from "../../components/Layout/PeachWrapper";
import { useToast } from "@chakra-ui/react";
import { foodChoices } from "../../utils/FormChoices";
import { statusChoices } from "../../utils/FormChoices";
import { targetChoices } from "../../utils/FormChoices";
import { equipmentChoices } from "../../utils/FormChoices";

const Register = () => {
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const methods = useForm();
  const navigate = useNavigate();

  const onFormSubmit = (data) => {
    data.equipment = data.equipment === "true" ? true : false;

    API.post("/users/register", data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 201 || res.data.status === 200) {
          toast({
            position: "top",
            title: "Usuario registrato correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
        }
      })
      .catch(() => {
        toast({
          position: "top",
          title: "No es posible crear la cuenta. Intentalo de nuevo",
          description: "no se puede crear",
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
            <Box>
              <Stack w="430px" py={8} px={6}>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow="#101010 4px 6px 0 0"
                  p={6}
                >
                  <Stack spacing={1}>
                    <Flex justifyContent="center" alignItems="center" wrap="wrap">
                      <Image
                        w="137px"
                        src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1670515077/HealthyLife/logo_1_kano6g.svg"
                      />
                    </Flex>
                    <Box pt="40px">
                      <FormInput
                        name="nickname"
                        placeholder="Nickname"
                        validations={{
                          required: "Este campo es requerido",
                          minLength: {
                            value: 2,
                            message: "Necesita un minimo de 2 caracteres",
                          },
                        }}
                      ></FormInput>
                    </Box>
                    <InputGroup position="relative">
                      <FormInput
                        name="password"
                        type={show ? "text" : "password"}
                        placeholder="******"
                        validations={{
                          required: "Este campo es requerido",
                          minLength: {
                            value: 6,
                            message: "Este campo debe tener al menos 6 caracteres",
                          },
                          pattern: {
                            value: /^\S*$/,
                            message: "El formato no es correcto",
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
                      ></FormInput>
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
                    </InputGroup>

                    <Box>
                      <FormInput
                        name="email"
                        placeholder="E-mail"
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

                    <HStack>
                      <Box>
                        <FormInput
                          name="age"
                          placeholder="Edad"
                          validations={{
                            pattern: {
                              value: /^(0|[1-9]\d*)(\.\d+)?$/,
                              message: "Introduce una edad válida",
                            },
                          }}
                        ></FormInput>
                      </Box>
                      <Box w="70%">
                        <FormInput
                          name="height"
                          placeholder="Altura (cm)"
                          validations={{
                            pattern: {
                              value: /^(0|[1-9]\d*)(\.\d+)?$/,
                              message: "Introduce una altura válida",
                            },
                          }}
                        ></FormInput>
                      </Box>
                      <Box>
                        <FormInput
                          name="weight"
                          placeholder="Peso (kg)"
                          validations={{
                            pattern: {
                              value: /^(0|[1-9]\d*)(\.\d+)?$/,
                              message: "Introduce un peso válido",
                            },
                          }}
                        ></FormInput>
                      </Box>
                    </HStack>

                    <HStack>
                      <Box w="50%">
                        <RegularSelect
                          placeholder="Dieta 🥑"
                          name="diet"
                          options={foodChoices}
                          validations={{
                            required: "Este campo es requerido",
                          }}
                        />
                      </Box>
                      <Box w="50%">
                        <RegularSelect
                          placeholder="Estado físico 💪"
                          name="status"
                          options={statusChoices}
                          validations={{
                            required: "Este campo es requerido",
                          }}
                        />
                      </Box>
                    </HStack>
                    <Box>
                      <RegularSelect
                        placeholder="Define tus objetivos 🎯"
                        name="target"
                        options={targetChoices}
                        validations={{
                          required: "Este campo es requerido",
                        }}
                      />
                    </Box>
                    <Box>
                      <RegularSelect
                        name="equipment"
                        placeholder="¿Tienes material para tus workouts?"
                        options={equipmentChoices}
                        radioColor="orange"
                        validations={{ required: "Este campo es requerido" }}
                      />
                    </Box>
                    <Stack spacing={1} pt={4}>
                      <StyledButton variant="primary" type="submit">
                        Finalizar
                      </StyledButton>
                    </Stack>
                    <Stack pt={4}>
                      <Text fontSize="13px" align={"center"}>
                        Si ya tienes cuenta puedes entrar{" "}
                        <StyledLoginLink
                          name="aquí"
                          href="/login"
                          hoverColor={myTheme.colors.primary}
                        />
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </form>
        </FormProvider>
      </Flex>
    </PeachWrapper>
  );
};

export default Register;
