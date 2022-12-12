import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FormControl, FormLabel, FormErrorMessage, Input,  } from "@chakra-ui/react";

import { useFormContext, useFormState } from "react-hook-form";
import styled from "styled-components";
import { myTheme } from "./Theme";
const ErrorStyled= styled.div`
color:red;
font-size:${myTheme.fontSizes.md};
margin-top: 5px;
 
`
const UIFormInput = ({ name, label, placeholder, helpText, text, validations,type }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input {...register(name, validations)} placeholder={placeholder} value={text} type={type}/>
      
      <ErrorStyled><ErrorMessage errors={errors} name={name} /></ErrorStyled>
    </FormControl>
  );
};

export default UIFormInput;

/* function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
} */