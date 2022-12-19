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
import UiButton from "../../components/UIComponents/UIButton";
import { API } from "../../services/API";
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

const Register = () => {
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const methods = useForm();
  const navigate = useNavigate();

  const onFormSubmit = (data) => {
    data.equipment = data.equipment === "true" ? true : false;
    // data.avatar = data.avatar[0];
    // const formData = new FormData();
    // formData.append("nickname", data.nickname)
    // formData.append("password", data.password)
    // formData.append("email", data.email)
    // formData.append("height", data.height)
    // formData.append("weight", data.weight)
    // formData.append("age", data.age)
    // formData.append("diet", data.diet)
    // formData.append("status", data.status)
    // formData.append("target", data.target)
    // formData.append("avatar", data.avatar[0])
    // formData.append("equipment", data.equipment === "true" ? true : false)
    
    API.post("/users/register", data)
      .then((res) => {
        console.log(res)
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
          <form  onSubmit={methods.handleSubmit(onFormSubmit)}>
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
                      <Box>
                        <Text pt="15px" fontSize="20px" fontWeight="bold">
                          ¡Bienvenidx!
                        </Text>
                        <Text fontSize="14px">Rellena tus datos y crea tu cuenta 😎</Text>
                      </Box>
                    </Flex>
                    <Box>
                      {/* <UIFormInput type="file" name="avatar" id="avatar"/> */}
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
                    <InputGroup position="relative">
                      <UIInput
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
                    </InputGroup>

                    <Box>
                      <UIFormInput
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
                        <UIFormInput
                          name="age"
                          placeholder="Edad"
                          validations={{
                            pattern: {
                              value: /^(0|[1-9]\d*)(\.\d+)?$/,
                              message: "Introduce una edad válida",
                            },
                          }}
                        ></UIFormInput>
                      </Box>
                      <Box w="70%">
                        <UIInput
                          name="height"
                          placeholder="Altura (cm)"
                          validations={{
                            pattern: {
                              value: /^(0|[1-9]\d*)(\.\d+)?$/,
                              message: "Introduce una altura válida",
                            },
                          }}
                        ></UIInput>
                      </Box>
                      <Box>
                        <UIInput
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
                    </HStack>

                    <HStack>
                      <Box w="50%">
                        <UISelect
                          placeholder="Dieta 🥑"
                          name="diet"
                          options={foodChoices}
                          validations={{
                            required: "Este campo es requerido",
                          }}
                        />
                      </Box>
                      <Box w="50%">
                        <UISelect
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
                      <UISelect
                        placeholder="Define tus objetivos 🎯"
                        name="target"
                        options={targetChoices}
                        validations={{
                          required: "Este campo es requerido",
                        }}
                      />
                    </Box>
                    <Box>
                      <UISelect
                        name="equipment"
                        placeholder="¿Tienes material para tus workouts?"
                        options={equipmentChoices}
                        radioColor="orange"
                        validations={{ required: "Este campo es requerido" }}
                      />
                    </Box>
                    <Stack spacing={1} pt={4}>
                      <UiButton variant="primary" type="submit">
                        Finalizar
                      </UiButton>
                    </Stack>
                    <Stack pt={4}>
                      <Text fontSize="13px" align={"center"}>
                        Si ya tienes cuenta puedes entrar{" "}
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
            </Box>
          </form>
        </FormProvider>
      </Flex>
    </PeachWrapper>
  );
};

export default Register;
