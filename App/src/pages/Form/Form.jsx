import { Box, Flex, Image, Stack, HStack, Text, useColorModeValue,FormControl, FormLabel,RadioGroup , Radio,FormHelperText   } from "@chakra-ui/react";
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
import UISelect from "../../components/UIComponents/UISelect";

const Register = () => {
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
    </PeachWrapper>
  );
};

export default Register;
