import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const UIInput = ({ label, placeholder, helpText, text, onChange }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input placeholder={placeholder} value={text} onChange={(e) => onChange(e)} />
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};

export default UIInput;
