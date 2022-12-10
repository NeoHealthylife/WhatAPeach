import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";
import React from "react";

const UISelect = (props) => {
  const { options, label, placeholder, onChange, isError } = props;

  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <FormControl isInvalid={isError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select placeholder={placeholder} onChange={(e) => onChange && handleChange(e)}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {isError && <FormErrorMessage>{isError}</FormErrorMessage>}
    </FormControl>
  );
};

export default UISelect;
