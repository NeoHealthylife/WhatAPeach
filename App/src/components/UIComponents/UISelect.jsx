import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext, useFormState } from "react-hook-form";
import { ErrorStyled } from "./UIFormInput";
const UISelect = ({ options, label, placeholder, name, validations }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Select placeholder={placeholder} {...register(name, validations)}>
        {options && options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label || option.value}
          </option>
        ))} 
      </Select>
      <ErrorStyled><ErrorMessage errors={errors} name={name} /></ErrorStyled>
    </FormControl>
  );
};

export default UISelect;
