import { Box, Flex, Image, Stack, Text, useColorModeValue,FormControl, Button,Radio , InputRightElement,RadioGroup, InputGroup,FormLabel, IconButton, Progress, ButtonGroup,HStack,  } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UiButton from "../../components/UIComponents/UIButton";
import { BsGoogle } from "react-icons/bs";
import { API } from "../../services/API";
import { useToast } from '@chakra-ui/react';
import UISelect from "../../components/UIComponents/UISelect";
import {
  default as UIFormInput,
  default as UIInput,
} from "../../components/UIComponents/UIFormInput";
import { NavItemLinkNoHover } from "../../components/UIComponents/NavItemLink-NoHover";
import { myTheme } from "../../components/UIComponents/Theme";
import PeachWrapper from "../../components/Layout/PeachWrapper";
import {HiOutlineEyeSlash, HiOutlineEye } from "react-icons/hi2"


const Form1=()=>{
const [registeredUser, setRegisteredUser]= useState("")
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const methods = useForm();
  const navigate = useNavigate();

  const onFormSubmit = (data) => {



    /* API.post('/users/register', data).then((res)=>{
      console.log(data)
      if (res.data.status===200){
          navigate('/')
      }    
    }) */};

  return (
      <Flex align={"center"} justify={"center"}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit)}>
            <Stack w="430px" py={5} px={6}>
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
                <Stack spacing={4}>
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
                  <InputGroup>
                    <UIInput
                      name="password"
                      type={show ? 'text' : 'password'}
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
                    <InputRightElement h='full' width='initial'>
                      <IconButton variant='primary' bg="transparent" h='1.75rem' size='lg' color='primary' onClick={handleClick}>
                        {show ? <HiOutlineEyeSlash/> : <HiOutlineEye/>}
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
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
  );
}

const Form2=()=>{
  const { user, setUser } = useState;
const foodChoices=[{label:'vegetariana', value:'vegetarian'}, {value:'vegana'}, {value:'normal'}];//terminar arrays
const statusChoices =[{value:'Baja forma'},{value:'Buena forma'}, {value:'Muy buena forma'}];
const targetChoices =[{value: 'Perder peso'}, {value:'Musculación'},{value:'Definición'}]
  const methods = useForm();
  const navigate = useNavigate();

  const onFormSubmit = (data) => {
    /* registerUser(data) */
    // RegisterUser({
    //   age: ev.age,
    //    height: ev.height,
    //    weight: ev.weight,
    //    diet: ev.diet,
    //    status:ev.status,
    //    target:ev.target,
    //    equipment:ev.equipment
    // }).then(navigate(`dashboard/`));
  };

  return (
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
                <Box>
                <Text alignSelf='flex-start' pt='15px' fontSize='20px' fontWeight='bold'>
                ¡Bienvenidx!
                </Text>
                <Text fontSize='14px'>Rellena tus datos para poder crearte una cuenta</Text>
                </Box>
              </Stack>
                <Stack spacing={4}>
                <HStack>
                  <Box>
                    <UIFormInput
                      name="age"
                      placeholder="Edad"           
                    ></UIFormInput>
                    </Box>
                    <Box>
                    <UIInput
                      name="height"
                      placeholder="Altura (cm)"                      
                    ></UIInput>
                  </Box>
                  </HStack>
                  <Box w='50%'>
                    <UIInput 
                      name="weight"
                      placeholder="Peso (kg)"
                      
                    ></UIInput>
                    </Box>
                    <HStack>
                    <Box w='50%'>
                    <UISelect placeholder='Dieta' name='diet' options={foodChoices} validations={{
                        required: "Este campo es requerido",
                       }}/>
                    
                  </Box>                  
                  <Box w='50%'>                    
                    <UISelect placeholder='Estado físico' name='status' options={statusChoices} validations={{
                        required: "Este campo es requerido",
                       }}/>
                    
                  </Box>
                  </HStack>
                  <Box>                    
                    <UISelect placeholder='Define tus objetivos' name='target' options={targetChoices} validations={{
                        required: "Este campo es requerido",
                       }}/>
                    
                  </Box>        
                  <Box>
                  <FormControl as='fieldset'>
                  <FormLabel as='legend'>¿Tienes material para las rutinas de ejercicios?</FormLabel>
                  <RadioGroup defaultValue='Sí'>
                    <HStack spacing='24px'>
                      <Radio value='Sí' colorScheme='orange'>Sí</Radio>
                      <Radio value='No' colorScheme='orange'>No</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                </Box>
                  <Stack spacing={1} pt={8}>
                    <UiButton variant="primary" type="submit">
                      Finalizar
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

  );
}

 const RegisterForm=()=> {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(49);
  return (
    <PeachWrapper>
      <Box
        rounded="lg"
        width='450px'
        p={6}
        m="auto"
        as="form">
        <Flex justifyContent='center'>
        <Progress
        width='430px'
          hasStripe
          colorScheme='orange'
          value={progress}
          mx="5%"
          isAnimated></Progress>
          </Flex>
        {step === 1 ? <Form1 /> : <Form2 />}
        <ButtonGroup w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex >
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 49);
                }}
                isDisabled={step === 1}
                colorScheme="primary"
                variant="solid"
                w="7rem"
                mr="5%">
                Volver
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 2}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 2) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 49);
                  }
                }}
                colorScheme="primary"
                rounded='20px'
                variant="outline">
                Siguiente
              </Button>
            </Flex>
            {step === 2 ? (
              <Button
                w="7rem"
                colorScheme="green"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
      </PeachWrapper>
  );
}
export default RegisterForm