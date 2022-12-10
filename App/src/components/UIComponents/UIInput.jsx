import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  propNames,
} from "@chakra-ui/react";

const UIInput = (props) => {
 const { label, placeholder, error, helpText, text } = props;
  
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input placeholder={placeholder} value={text} {...props} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};

export default UIInput;
