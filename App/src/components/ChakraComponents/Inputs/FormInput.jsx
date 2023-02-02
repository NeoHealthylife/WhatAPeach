import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useFormContext, useFormState } from "react-hook-form";
import styled from "styled-components";
import { myTheme } from "../Custom-theme/Theme";
const ErrorStyled = styled.div`
  color: #ff3300;
  font-size: ${myTheme.fontSizes.xsm};
  margin-top: 5px;
`;

const FormInput = ({
  name,
  label,
  placeholder,
  text,
  validations,
  type,
  defaultValue,
}) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  return (
    <FormControl>
      <FormLabel fontSize="sm" color="label">
        {label}
      </FormLabel>
      <Input
        fontSize="sm"
        {...register(name, validations)}
        placeholder={placeholder}
        value={text}
        type={type}
        defaultValue={defaultValue}
      />

      <ErrorStyled>
        <ErrorMessage errors={errors} name={name} />
      </ErrorStyled>
    </FormControl>
  );
};
export { ErrorStyled };
export default FormInput;
