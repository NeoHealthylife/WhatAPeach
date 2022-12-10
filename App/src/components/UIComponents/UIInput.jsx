import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const UIInput = ({ label, placeholder, error, helpText, text }) => {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input placeholder={placeholder} value={text} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};

export default UIInput;
