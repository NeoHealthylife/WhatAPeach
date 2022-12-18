import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useFormContext, useFormState } from "react-hook-form";
import styled from "styled-components";
import { myTheme } from "../ChakraComponents/Theme";
const ErrorStyled = styled.div`
  color: #ff3300;
  font-size: ${myTheme.fontSizes.xsm};
  margin-top: 5px;
`;

const UIFormInput = ({ name, label, placeholder, text, validations, type }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        fontSize="sm"
        {...register(name, validations)}
        placeholder={placeholder}
        value={text}
        type={type}
      />

      <ErrorStyled>
        <ErrorMessage errors={errors} name={name} />
      </ErrorStyled>
    </FormControl>
  );
};
export { ErrorStyled };
export default UIFormInput;
