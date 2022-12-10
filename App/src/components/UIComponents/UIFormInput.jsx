import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FormControl, FormLabel, FormHelperText, Input } from "@chakra-ui/react";

import { useFormContext, useFormState } from "react-hook-form";

const UIFormInput = ({ name, label, placeholder, helpText, text, validations }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input {...register(name, validations)} placeholder={placeholder} value={text} />
      <ErrorMessage errors={errors} name={name} />
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};

export default UIFormInput;
