import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext, useFormState } from "react-hook-form";
import { ErrorStyled } from "./Inputs/FormInput";
const RegularSelect = ({
  options,
  label,
  placeholder,
  name,
  validations,
  defaultValue,
}) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  return (
    <FormControl>
      {label && (
        <FormLabel fontSize="sm" color="label">
          {label}
        </FormLabel>
      )}
      <Select
        fontSize="sm"
        placeholder={placeholder}
        {...register(name, validations)}
        defaultValue={defaultValue}
      >
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
      </Select>
      <ErrorStyled>
        <ErrorMessage errors={errors} name={name} />
      </ErrorStyled>
    </FormControl>
  );
};

export default RegularSelect;
