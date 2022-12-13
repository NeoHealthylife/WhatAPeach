import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";
import React from "react";
import { useFormContext, useFormState } from "react-hook-form";

const UISelect = (props) => {
  const { options, label, placeholder, isError, name } = props;
  const { register } = useFormContext();

  return (
    <FormControl isInvalid={isError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select placeholder={placeholder} {...register(name)}>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
      </Select>
    </FormControl>
  );
};

export default UISelect;
