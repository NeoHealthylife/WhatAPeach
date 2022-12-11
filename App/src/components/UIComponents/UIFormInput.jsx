import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FormControl, FormLabel, FormErrorMessage, Input } from "@chakra-ui/react";

import { useFormContext, useFormState } from "react-hook-form";
import styled from "styled-components";
import { myTheme } from "./Theme";
const ErrorStyled= styled.div`
color:red;
font-size:${myTheme.fontSizes.md};
margin-top: 5px;
 
`
const UIFormInput = ({ name, label, placeholder, helpText, text, validations }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input {...register(name, validations)} placeholder={placeholder} value={text} />
      <ErrorStyled><ErrorMessage errors={errors} name={name} /></ErrorStyled>
    </FormControl>
  );
};

export default UIFormInput;
