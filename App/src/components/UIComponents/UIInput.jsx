import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const UIInput = ({ label, placeholder, helpText, text }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input placeholder={placeholder} value={text} />
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};

export default UIInput;
