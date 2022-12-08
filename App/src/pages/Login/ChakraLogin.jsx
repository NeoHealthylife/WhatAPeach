import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/API";
import { NavLink } from 'react-router-dom'
import {
    Flex,
    Image,
    Box,
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Center,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import {BsGoogle} from 'react-icons/bs';
import UiButton from "../../components/UIButton";
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const { user, setUser } = useState
    const navigate = useNavigate();
    const toggleEye = (ev) => {
        ev.preventDefault();
        setEye(!eye);
    };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    ev.preventDefault();
    loginUser({
      nickname: values.nickname,
      password: values.password,
    }).then(navigate(`dashboard/`));
  };

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Image src='https://res.cloudinary.com/drh0lkvxh/image/upload/v1670515077/HealthyLife/logo_1_kano6g.svg'/>
            <Text fontSize={'lg'} color={'gray.600'}>
              si queremos poner una intro de nuestra web
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="#101010 4px 6px 0 0"
            p={8}>
            <Stack spacing={4}>
                <Box>
                  <FormControl id="Nickname" isRequired>
                    <Input type="text" placeholder="Nickname" 
                 className="input"
                {...register("username", {
                  required: true,
                  minLength: 2,
                })}
                onChange={(ev) => setUser({...user, nickname:ev.target.value})}
              />
              {errors.username ? (
                <p className="error">
                  Este campo es requerido y debe tener al menos 2 caracteres
                </p>
              ) : null} 
              
                  </FormControl>
                </Box>
                <Box>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input className="input"
                    {...register("Contraseña", {
                      required: true,
                      minLength: 6,
                      pattern: /^\S*$/,
                      validate: {
                        format: (Contraseña) => {
                          return (
                            /[A-Z]/g.test(Contraseña) &&
                            /[a-z]/g.test(Contraseña) &&
                            /[0-9]/g.test(Contraseña)
                          );
                        },
                      },
                    })} placeholder="*****" type={showPassword ? 'text' : 'password'}
                    onChange={(ev) => setUser({...user, password:ev.target.value})}
                    /><InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>{errors.Contraseña ? (
                    <p className="error">
                      {errors.Contraseña.type === "format"
                        ? "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
                        : "Este campo es requerido y debe tener al menos 6 caracteres"}
                    </p>
                  ) : null}
                  
                </InputGroup>
              </FormControl>
              </Box>
              <Stack spacing={10} pt={2}>
            <button className="loginBtn" type="submit">
            Entrar
          </button>
              </Stack>
              <UiButton variant="socialLogin"> Hola </UiButton>
              <Stack pt={6}>
                <Text align={'center'}>
                  Si no tienes cuenta puedes registrarte <NavLink color={'blue.400'}>aquí</NavLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        </form>
      </Flex>
    );
  }